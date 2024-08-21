// import { mutation } from "./_generated/server";

// export const populateUserTypes = mutation(async (ctx) => {
//   const existingTypes = await ctx.db.query("userTypes").collect();

//   if (existingTypes.length === 0) {
//     await ctx.db.insert("userTypes", { UserType: "Admin" });
//     await ctx.db.insert("userTypes", { UserType: "Customer" });
//     await ctx.db.insert("userTypes", { UserType: "CustomerSupport" });

//     console.log("User types initialized.");
//   } else {
//     console.log("User types already exist, skipping initialization.");
//   }
// });
    // Define UserTypeID
    // let userTypeID: Id<"userTypes"> | undefined;

    // // Assign admin account
    // if (identity.email === "goodandbest@gmail.com") {
    //   const adminType = await ctx.db
    //     .query("userTypes")
    //     .filter((q) => q.eq("UserType", "Admin"))
    //     .unique();
    //   if (!adminType) {
    //     throw new Error("Admin user type not found");
    //   }
    //   userTypeID = adminType._id;
    // } else {
    //   // Handling customer account
    //   const customerType = await ctx.db
    //     .query("userTypes")
    //     .filter((q) => q.eq("UserType", "Customer"))
    //     .unique();
    //   if (!customerType) {
    //     throw new Error("Customer user type not found");
    //   }
    //   userTypeID = customerType?._id;
    // }