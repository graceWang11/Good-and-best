import { mutation } from "./_generated/server";

// Example product categories
const productCategories = [
  { categoryName: "Rackets" },
  { categoryName: "Shuttles" },
  { categoryName: "Accessories" },
  { categoryName: "Shoes" },
];

// Mutation to clear and reinsert normalized categories
export const reinsertProductCategories = mutation(async (ctx) => {
  // Delete all existing categories
  const existingCategories = await ctx.db.query("ProductCategory").collect();
  for (const category of existingCategories) {
    await ctx.db.delete(category._id);
  }

  // Insert normalized categories
  for (const category of productCategories) {
    const normalizedCategoryName = category.categoryName.trim();

    const insertedID = await ctx.db.insert("ProductCategory", {
      categoryName: normalizedCategoryName,
    });
    console.log(`Inserted normalized category "${category.categoryName}" with ID: ${insertedID}`);
  }
});
