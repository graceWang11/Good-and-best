import { mutation } from "./_generated/server";

export const initUserTypes = mutation(async ({ db }) => {
  // Check if user types already exist to avoid duplication
  const existingUserTypes = await db.query("userTypes").collect();
  
  if (existingUserTypes.length === 0) {
    await db.insert("userTypes", { UserType: "Admin" });
    await db.insert("userTypes", { UserType: "Customer" });
    console.log("Initialized database with Admin and Customer UserTypes");
  } else {
    console.log("User types already exist, skipping initialization.");
  }
});
