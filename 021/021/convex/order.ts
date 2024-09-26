
import { mutation ,query} from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";

interface CartItem {
    productId: string;
    quantity: number;
    price: number;
    sizeId?: string;
  }



  
  export const placeOrder = mutation(
    async ({ db, auth }, { cartItems }: { cartItems: CartItem[] }) => {
      // Get the authenticated user's identity
      const identity = await auth.getUserIdentity();
      if (!identity) {
        throw new Error("User is not authenticated");
      }
  
      // Fetch the user from the 'users' table based on tokenIdentifier
      const userRecord = await db
        .query("users")
        .filter((q) =>
          q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier)
        )
        .first();
  
      if (!userRecord) {
        throw new Error("User not found");
      }
  
      // Calculate total amount
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
  
      // Insert order details for each cart item
      const orderDetailIds: Id<"orderDetails">[] = [];
  
      for (const item of cartItems) {
        // Insert into orderDetails
        const orderDetailId = await db.insert("orderDetails", {
          productID: item.productId as Id<"products">,
          quantity: item.quantity,
          price: item.price,
          sizeID: item.sizeId as Id<"size">,
        });
        orderDetailIds.push(orderDetailId);
      }
  
      // Create a new order with the array of orderDetailIds
          // Start of Selection
          const orderId = await db.insert("orders", {
            userID: userRecord._id,
            orderDetailsID: orderDetailIds, // Store the array of IDs
            orderDate: new Date().toISOString(),
            totalAmount,
            status: "Pending",
          });
  
      return { orderId };
    }
  );

  export const getOrderDetails = query(
    async ({ db, auth, storage }, { orderId }: { orderId: string }) => {
      // Get the authenticated user's identity
      const identity = await auth.getUserIdentity();
      if (!identity) {
        throw new Error("User is not authenticated");
      }
  
      // Fetch the user from the 'users' table based on tokenIdentifier
      const userRecord = await db
        .query("users")
        .filter((q) =>
          q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier)
        )
        .first();
  
      if (!userRecord) {
        throw new Error("User not found");
      }
      // Fetch the order
      const order = await db.query("orders").filter(q => q.eq(q.field("_id"), orderId)).first();

      if (!order) {
        throw new Error("Order not found");
      }
  
      // Verify that the order belongs to the authenticated user
      if (order.userID !== userRecord._id) {
        throw new Error("Unauthorized access to order");
      }
  
      // Prepare an array to hold the order details with product and image information
      const orderDetails = [];
  
      // Loop through each orderDetailId in the order
      for (const orderDetailId of order.orderDetailsID) {
        const orderDetail = await db.get(orderDetailId);
        if (!orderDetail) {
          continue; // Skip if orderDetail not found
        }
  
        // Fetch the product associated with this orderDetail
        const product = await db.get(orderDetail.productID);
  
        // Fetch image records associated with this product
        const imageRecords = await db
          .query("imageStorage")
          .filter((q) => q.eq(q.field("productID"), orderDetail.productID))
          .collect();
  
        // Fetch image URLs using storage.getUrl
        const imageUrls = await Promise.all(
          imageRecords.map(async (record) => {
            return await storage.getUrl(record.storageID);
          })
        );
  
        // Add the combined information to the orderDetails array
        orderDetails.push({
          ...orderDetail,
          productName: product?.productName,
          imageUrls,
        });
      }
  
      return {
        order,
        orderDetails,
      };
    }
  );