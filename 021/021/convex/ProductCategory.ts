import { mutation } from "./_generated/server";

// Example product categories
const productCategories = [
  { categoryName: "Rackets" },
  { categoryName: "Shuttles" },
  { categoryName: "Accessories" },
  { categoryName: "Shoes" },
];

// Define the mutation to insert product categories
export const insertProductCategories = mutation(async (ctx) => {
  for (const category of productCategories) {
    // Check if the category already exists using a query
    const existingCategory = await ctx.db.query("ProductCategory")
      .filter(q => q.eq("categoryName", category.categoryName))
      .first();

    if (existingCategory) {
      console.log(`Category "${category.categoryName}" already exists.`);
      continue; // Skip to the next item if it exists
    }

    // Insert the new category if it doesn't exist
    const insertedID = await ctx.db.insert("ProductCategory", {
      categoryName: category.categoryName,
    });

    console.log(`Inserted category "${category.categoryName}" with ID: ${insertedID}`);
  }
});