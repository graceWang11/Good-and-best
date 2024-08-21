import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Define a mutation called 'store' which allows you to store user information in the database
export const store = mutation({
  // Specify that the mutation takes arguments for UserName, Address, and PhoneNumber
  args: {
    userName: v.string(),
    address: v.string(),
    phoneNumber: v.string(),
  },

  // The handler function is where the logic for the mutation is defined
  handler: async (
    ctx,
    { userName, address, phoneNumber }: { userName: string; address: string; phoneNumber: string }
  ) => {
    // Get the identity of the currently authenticated user
    const identity = await ctx.auth.getUserIdentity();

    // If there is no authenticated user, throw an error
    if (!identity) {
      throw new Error("Called store without authenticated user");
    }

    // Query the database to check if the user is already stored
    const user = await ctx.db
      .query("users") // Specify the 'users' table/collection
      .withIndex("by_token", (q) =>
        // Use the 'by_token' index to find the user by their tokenIdentifier
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique(); // Expect a unique result

    // If the user is found (not null), return their user ID
    if (user !== null) {
      return user._id;
    }

    // If the user is not found, insert a new user record into the 'users' table
    const userID = await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier, // Store the user's token identifier
      email: identity.email!, // Store the user's email (using non-null assertion)
      userName, // Store the UserName
      address, // Store the Address
      phoneNumber, // Store the PhoneNumber
    });

    // Return the new user ID after insertion
    return userID;
  },
});
