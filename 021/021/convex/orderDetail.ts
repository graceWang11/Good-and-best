// // convex/orderDetail.ts

// import { mutation } from "./_generated/server";
// import { Id } from "./_generated/dataModel";

// interface CartItem {
//   productId: string;
//   quantity: number;
//   price: number;
// }

// export const placeOrder = mutation(
//   async ({ db, auth }, { cartItems }: { cartItems: CartItem[] }) => {
//     // Get the authenticated user's identity
//     const identity = await auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("User is not authenticated");
//     }

//     // Fetch the user from the 'users' table based on tokenIdentifier
//     const userRecord = await db
//       .query("users")
//       .filter((q) =>
//         q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier)
//       )
//       .first();

//     if (!userRecord) {
//       throw new Error("User not found");
//     }

//     // Create a new order
//     const orderId = await db.insert("orders", {
//       userID: userRecord._id,
//       orderDetailsID: undefined, // Will be set after inserting orderDetails
//       sizeID: undefined,         // Not used here but required by schema
//       orderDate: new Date().toISOString(),
//       totalAmount: cartItems.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//       ),
//       status: "Pending",
//     });

//     // Insert order details for each cart item
//     const orderDetailIds: Id<"orderDetails">[] = [];

//     for (const item of cartItems) {
//       // Insert into orderDetails
//       const orderDetailId = await db.insert("orderDetails", {
//         productID: new Id("products", item.productId),
//         quantity: item.quantity,
//         price: item.price,
//       });

//       orderDetailIds.push(orderDetailId);
//     }

//     // Since `orderDetailsID` in your schema is a single ID, we need to handle this
//     // Here, we'll assume only one item per order for simplicity
//     // If multiple items are allowed, the schema might need adjustment

//     // Update the order with the first orderDetailId
//     await db.patch(orderId, {
//       orderDetailsID: orderDetailIds[0], // Assigning the first orderDetail ID
//     });

//     return { orderId };
//   }
// );