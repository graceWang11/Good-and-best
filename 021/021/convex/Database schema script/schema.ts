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
  });