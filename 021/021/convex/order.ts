import { mutation ,query} from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";
import { v } from "convex/values";

interface CartItem {
    productId: string;
    quantity: number;
    price: number;
    sizeId?: string;
  }
  interface OrderDetailItem {
    productID: Id<"products">;
    quantity: number;
    price: number;
    sizeID?: Id<"size">;
  }
  export const placeOrder = mutation(
    async ({ db, auth }, { cartItems }: { cartItems: CartItem[] }) => {
      const identity = await auth.getUserIdentity();
      if (!identity) {
        throw new Error("User is not authenticated");
      }
  
      const userRecord = await db
        .query("users")
        .filter((q) =>
          q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier)
        )
        .first();
  
      if (!userRecord) {
        throw new Error("User not found");
      }
  
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
          // Prepare the order details array
    const orderDetails = cartItems.map((item) => ({
        productID: item.productId,
        quantity: item.quantity,
        price: item.price,
        sizeID: item.sizeId || undefined,
      }));
  
    // Insert the order into the 'orders' table
    const orderId = await db.insert("orders", {
        userID: userRecord._id,
        orderDate: new Date().toISOString(),
        totalAmount,
        status: "Pending",
        orderDetails: orderDetails.map(detail => ({
          ...detail,
          productID: detail.productID as Id<"products">,
          sizeID: detail.sizeID ? detail.sizeID as Id<"size"> : undefined,
        })),
    });
  
      // Insert each order detail into the 'orderDetails' table
      for (const item of cartItems) {
        await db.insert("orderDetails", {
          orderID: orderId,
          productID: item.productId as Id<"products">,
          quantity: item.quantity,
          price: item.price,
          sizeID: item.sizeId as Id<"size">,
        });
      }
  
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
  
      // Fetch the order using the provided orderId
      const order = await db.query("orders").filter((q) => q.eq(q.field("userID"), userRecord._id)).first();
  
      if (!order) {
        throw new Error("Order not found");
      }
  
      // Verify that the order belongs to the authenticated user
      if (order.userID !== userRecord._id) {
        throw new Error("Unauthorized access to order");
      }
  
      // Fetch orderDetails associated with this order using 'orderID'
      const orderDetails = await db
        .query("orderDetails")
        .filter((q) => q.eq(q.field("orderID"), order._id))
        .collect();
  
     // Fetch orderDetails from 'orderDetails' table
     const orderDetailsFromTable = await db
     .query("orderDetails")
     .filter((q) => q.eq(q.field("orderID"), order._id))
     .collect();

   // Prepare detailed order details
   const detailedOrderDetails = [];

   for (const orderDetail of orderDetailsFromTable) {
     // Fetch the product
     const product = await db.get(orderDetail.productID);

     // Fetch image records
     const imageRecords = await db
       .query("imageStorage")
       .filter((q) => q.eq(q.field("productID"), orderDetail.productID))
       .collect();

     // Get image URLs
     const imageUrls = await Promise.all(
       imageRecords.map(async (record) => {
         return await storage.getUrl(record.storageID);
       })
     );

     // Combine information
     detailedOrderDetails.push({
       ...orderDetail,
       productName: product?.productName,
       imageUrls,
     });
   }

   return {
     order,
     orderDetails: detailedOrderDetails,
   };
 }
);

export const getAllOrders = query({
  handler: async (ctx) => {
    const orders = await ctx.db.query("orders").collect();
    return orders;
  },
});

export const getOrdersByCustomerId = query({
  args: { customerId: v.string() },
  handler: async (ctx, { customerId }) => {
    const orders = await ctx.db
      .query("orders")
      .filter(q => q.eq(q.field("userID"), customerId))
      .collect();
    return orders;
  },
});
export const getAll = query(async ({ db }) => {
  const orders = await db.query("orders")
    .order("desc")
    .collect();

  // Fetch customer details for each order
  const ordersWithDetails = await Promise.all(
    orders.map(async (order) => {
      const customer = await db.get(order.userID);
      return {
        ...order,
        customerName: customer ? `${customer.userName}` : 'Unknown',
      };
    })
  );

  return ordersWithDetails;
});
