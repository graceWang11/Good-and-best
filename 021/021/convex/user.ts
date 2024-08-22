import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const store = mutation({
  args: {
    userName: v.string(),
    address: v.string(),
    phoneNumber: v.string(),
  },

  handler: async (
    ctx,
    { userName, address, phoneNumber }: { userName: string; address: string; phoneNumber: string }
  ) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Called store without authenticated user");
    }

    // Check if the user already exists
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user !== null) {
      return user._id;
    }

    // Determine the UserTypeID before inserting the user
    let userTypeID: Id<"userTypes">;

    if (identity.email === "goodandbest@gmail.com") {
      // Assign Admin role
      const adminType = await ctx.db.query("userTypes").filter((q) => q.eq("UserType", "Admin")).unique();
      if (!adminType) {
        throw new Error("Admin user type not found");
      }
      userTypeID = adminType._id;
    } else {
      // Assign Customer role as the default
      const customerType = await ctx.db.query("userTypes").filter((q) => q.eq("UserType", "Customer")).unique();
      if (!customerType) {
        throw new Error("Customer user type not found");
      }
      userTypeID = customerType._id;
    }

    // Insert a new user record with userTypeID included
    const userID = await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email!,
      userName,
      address,
      phoneNumber,
      userTypeID, // Include userTypeID in the insert operation
    });

    return userID;
  },
});
