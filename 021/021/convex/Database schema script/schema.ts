import { defineSchema , defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    userTypes: defineTable({
      UserType: v.string(), 
    }),
  
    users: defineTable({
      tokenIdentifier: v.string(),
      email: v.string(),
      userTypeID: v.number(), // FK to UserType table
      userName: v.string(),
      address: v.string(),
      phoneNumber: v.string(),
    })
    .index("by_token", ["tokenIdentifier"]),
  });