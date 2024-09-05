import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const setStock = mutation({
  args: {
    productName: v.string(),
    brand: v.string(),
    categoryname: v.string(),
    stockQuantity: v.number(),
    series: v.string(),
    price: v.number(),
  },

  handler: async (ctx, { productName, brand, categoryname, stockQuantity,series, price }) => {
    // Retrieve product categories
    const productCategories = await ctx.db.query("ProductCategory").collect();
    const categoryMap = productCategories.reduce((map, category) => {
      map[category.categoryName] = category._id;
      return map;
    }, {} as Record<string, Id<"ProductCategory">>);

    const productCategoryID = categoryMap[categoryname];
    if (!productCategoryID) {
      console.log(`Category "${categoryname}" not found. Skipping product "${productName}".`);
      return;
    }
    // Check if the product exists in the database based on productName, brand, and productCategoryID
    let product = await ctx.db.query("products")
      .filter(q => 
        q.eq(q.field("productName"), productName) &&
        q.eq(q.field("brand"), brand) &&
        q.eq(q.field("productCategoryID"), productCategoryID)
      )
      .first();

    if (product) {
      console.log("This product is already in the database.");
    } else {
      // Insert a new product into the database
      const newProductId = await ctx.db.insert("products", {
        productCategoryID,
        brand: brand,
        productName: productName,
        Series: series || "", 
        price: price || 0,    
      });
      ;

      // Insert a new stock entry for the new product
      await ctx.db.insert("stock", {
        productID: newProductId,
        stockQuantity: stockQuantity,
      });

      console.log(`Inserted new stock for product "${productName}" with quantity: ${stockQuantity}`);
    }
  },
});
// Function to initialize stock for all existing products to 100
export const initializeStock = mutation(async (ctx) => {
  // Fetch all products in the database
  const products = await ctx.db.query("products").collect();

  for (const product of products) {
    // Check if a stock entry already exists for this product
    let stockRecord = await ctx.db.query("stock")
      .filter(q => q.eq(q.field("productID"), product._id))
      .first();

    if (!stockRecord) {
      // Insert a new stock entry with a quantity of 100 if it doesn't exist
      await ctx.db.insert("stock", {
        productID: product._id,
        stockQuantity: 100,
      });
      console.log(`Initialized stock for product ID: ${product._id} with quantity: 100`);
    } else {
      console.log(`Stock already exists for product ID: ${product._id}`);
    }
  }
});
