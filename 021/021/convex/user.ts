import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const store = mutation({
  args: {
    userName: v.string(),
    address: v.string(),
    phoneNumber: v.string(),
    email: v.string()
  },

  handler: async (
    ctx,
    { userName, address, phoneNumber, email }
  ) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    try {
      // Check if user already exists
      const existingUser = await ctx.db
        .query("users")
        .filter(q => q.eq(q.field("email"), email))
        .first();

      if (existingUser) {
        return existingUser._id;
      }

      // Get user types
      const userTypes = await ctx.db.query("userTypes").collect();
      const userTypeMap = userTypes.reduce((map, type) => {
        map[type.UserType] = type._id;
        return map;
      }, {} as Record<string, Id<"userTypes">>);

      // Determine user type based on email
      let userTypeId: Id<"userTypes">;
      if (email === "goodandbestteam@gmail.com") {
        userTypeId = userTypeMap["Admin"];
        if (!userTypeId) throw new Error("Admin user type not found");
      } else {
        userTypeId = userTypeMap["Customer"];
        if (!userTypeId) throw new Error("Customer user type not found");
      }

      // Create new user
      const userId = await ctx.db.insert("users", {
        tokenIdentifier: identity.tokenIdentifier,
        email,
        userName,
        address,
        phoneNumber,
        userTypeID: userTypeId,
        createdAt: new Date().toISOString(),
      });

      return userId;
    } catch (error) {
      console.error("Error storing user:", error);
      return null;
    }
  },
});

// Add a query to get user type
export const getUserType = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), email))
      .first();

    if (!user) return null;

    const userType = await ctx.db.get(user.userTypeID);
    return userType?.UserType;
  },
});

// Get user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    if (!email) return null;

    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), email))
      .first();

    if (!user) return null;

    // Get the user type
    const userType = await ctx.db.get(user.userTypeID);
    return {
      ...user,
      userType: userType?.UserType
    };
  },
});
