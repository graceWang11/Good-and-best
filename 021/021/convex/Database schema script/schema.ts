import { defineSchema , defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  //Define UserType table 
  userTypes: defineTable({
    UserType: v.string(), 
  }),
  
  //Define User Table 
  users: defineTable({
    tokenIdentifier: v.string(),
    email: v.string(),
    userTypeID: v.id("userTypes"),  // Reference to the userType table
    userName: v.string(),
    address: v.string(),
    phoneNumber: v.string(),
  })
  .index("by_token", ["tokenIdentifier"]),

  // Define the orders table
  orders: defineTable({
    userID: v.id("users"),   // Foreign key reference to users table
    orderDate: v.string(),   // Store date as a string in ISO format
    totalAmount: v.number(),
    status: v.string(),
  })
  .index("by_user", ["userID"]),  // Index for querying by userID

  // Define the order history table
  orderHistory: defineTable({
    orderID: v.id("orders"),   // Foreign key reference to orders table
    eventsDate: v.string(),    // Store date as a string in ISO format
  })
  .index("by_order", ["orderID"]),  // Index for querying by orderID

  // Define the order details table
  orderDetails: defineTable({
    orderID: v.id("orders"),    // Foreign key reference to orders table
    productID: v.id("products"), // Foreign key reference to products table
    sizeID: v.id("sizes"),       // Foreign key reference to sizes table
    quantity: v.number(),
    price: v.number(),
  })
  .index("by_order", ["orderID"])  // Index for querying by orderID
  .index("by_product", ["productID"]),  // Index for querying by productID
  
  // Define the product table
  products: defineTable({
    attributesID: v.id("attributes"),      // Foreign key reference to attributes table
    productCategoryID: v.id("productCategories"),  // Foreign key reference to product categories table
    vendorID: v.id("vendors"),             // Foreign key reference to vendors table
    brand: v.string(),
    productName: v.string(),
    price: v.number(),
  })
  .index("by_category", ["productCategoryID"])  // Index for querying by product category
  .index("by_vendor", ["vendorID"]),  // Index for querying by vendor

});