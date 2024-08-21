import { mutation } from ".././_generated/server";

export const populateUserTypes = mutation(async (ctx) => {
  const existingTypes = await ctx.db.query("userTypes").collect();

  if (existingTypes.length === 0) {
    await ctx.db.insert("userTypes", { UserType: "Admin" });
    await ctx.db.insert("userTypes", { UserType: "Customer" });
    await ctx.db.insert("userTypes", { UserType: "CustomerSupport" });

    console.log("User types initialized.");
  } else {
    console.log("User types already exist, skipping initialization.");
  }
});
