import { v } from "convex/values";
import { mutation, query } from "./_generated/server"; // Ensure the correct import path

export const addReview = mutation({
  args: {
    productId: v.id("products"),
    rating: v.number(),
    reviewDescription: v.string(),
  },
  handler: async (ctx, { productId, rating, reviewDescription }) => {
    const { db, auth } = ctx;

    // Get the authenticated user's identity
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("User is not authenticated");
    }

    const tokenIdentifier = identity.tokenIdentifier;

    // Fetch the user from the 'users' table based on tokenIdentifier
    let user = await db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier))
      .first();

    if (!user) {
      // Fetch the default userType
      let userType = await db
        .query("userTypes")
        .filter((q) => q.eq(q.field("UserType"), "default"))
        .first();

      if (!userType) {
        // Create a default userType if it does not exist
        const userTypeId = await db.insert("userTypes", {
          UserType: "default",
          // Add any other required fields here
        });
        userType = await db.get(userTypeId);
      }

      // Create a new user record
      const userId = await db.insert("users", {
        tokenIdentifier,
        email: String(identity.emailAddress ?? ""),
        userTypeID: userType!._id, // Use the userType's _id
        userName:
          identity.name ??
          `${identity.firstName ?? ""} ${identity.lastName ?? ""}`,
        address: "",
        phoneNumber: "",
        createdAt: new Date().toISOString(),
      });

      // Retrieve the newly created user
      user = await db.get(userId);
    }

    // Insert the new review into the 'review' table
    const reviewId = await db.insert("review", {
    productID: productId,
    userID: user!._id,
    rating,
    reviewDescription,
    });

    return reviewId;
  },
});
// Add the getReviewsByProductId query
export const getReviewsByProductId = query({
    args: {
      productId: v.id("products"),
    },
    handler: async (ctx, { productId }) => {
      const { db } = ctx;
      const reviews = await db
        .query("review")
        .withIndex("by_product", (q) => q.eq("productID", productId))
        .collect();
  
      // Fetch user names for each review
      const reviewsWithUserNames = await Promise.all(
        reviews.map(async (review) => {
          const user = await db.get(review.userID);
          return {
            ...review,
            userName: user?.userName || "Anonymous",
          };
        })
      );
  
      return reviewsWithUserNames;
    },
  });