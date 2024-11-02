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

  export const getOrderDetails = query({
    args: { orderId: v.string() },
    handler: async (ctx, { orderId }) => {
      const { db } = ctx;
      
      console.log("Looking for order with ID:", orderId);

      // Convert string ID to Convex ID type
      const order = await db.get(orderId as Id<"orders">);
      
      if (!order) {
        throw new Error(`Order not found for ID: ${orderId}`);
      }

      // Get customer details
      const customer = await db.get(order.userID);

      // Get order details from orderDetails table using the order ID
      const orderDetails = await db
        .query("orderDetails")
        .filter(q => q.eq(q.field("orderID"), order._id))
        .collect();

      console.log(`Found ${orderDetails.length} items for order ${orderId}`);

      // Get product details for each order item
      const detailedOrderItems = await Promise.all(
        orderDetails.map(async (detail) => {
          const product = await db.get(detail.productID);
          let sizeInfo = null;
          
          // If there's a sizeID, get the size information
          if (detail.sizeID) {
            sizeInfo = await db.get(detail.sizeID);
          }

          return {
            _id: detail._id,
            productName: product?.productName || "Unknown Product",
            quantity: detail.quantity,
            price: detail.price,
            sizeValue: sizeInfo?.SizeValue,
            sizeRegion: sizeInfo?.SizeRegion,
          };
        })
      );

      return {
        order: {
          _id: order._id,
          orderDate: order.orderDate,
          totalAmount: order.totalAmount,
          status: order.status,
          customerName: customer?.userName || "Unknown Customer",
        },
        orderDetails: detailedOrderItems,
      };
    },
  });

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
