import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const store = mutation({
  args: {
    userName: v.string(),
    address: v.string(),
    phoneNumber: v.string(),
    email:v.string()
  },

  handler: async (
    ctx,
    { userName, address, phoneNumber,email}: { userName: string; address: string; phoneNumber: string ;email:string}
  ) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity || !identity.email) {
      console.log("Email mismatch or user not authenticated");
      return null; // Return null instead of throwing an error
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
 

    // Retrieve user types
    const userTypes = await ctx.db.query("userTypes").collect();
    const userTypeMap = userTypes.reduce((map, userType) => {
      map[userType.UserType] = userType._id;
      return map;
    }, {} as Record<string, Id<"userTypes">>);

    // Determine the UserTypeID before inserting the user
    let userTypeID: Id<"userTypes">;

    if (identity.email === "goodandbestteam@gmail.com") {
      // Assign Admin role
      userTypeID = userTypeMap["Admin"];
      if (!userTypeID) {
        throw new Error("Admin user type not found");
      }
    } else {
      // Assign Customer role as the default
      userTypeID = userTypeMap["Customer"];
      if (!userTypeID) {
        throw new Error("Customer user type not found");
      }
    }

    // Insert a new user record with userTypeID included
    const userID = await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      email,
      userName,
      address,
      phoneNumber,
      userTypeID, // Include userTypeID in the insert operation
    });

    return userID;
  },
});
