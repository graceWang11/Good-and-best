import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const store = mutation({
  args: {
    email: v.string(),
    userName: v.string(),
    address: v.string(),
    phoneNumber: v.string(),
    userType: v.optional(v.string()), // Make userType optional
  },
  handler: async (ctx, args) => {
    // Your existing store logic
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    const userId = await ctx.db.insert("users", {
      email: args.email,
      userName: args.userName,
      address: args.address,
      phoneNumber: args.phoneNumber,
      userType: args.userType || "Customer", // Default to "Customer" if not provided
    });

    return userId;
  },
});

export const getUserById = query({
  args: { 
    userId: v.id("users") // Specifically validate for users table ID
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
}); 