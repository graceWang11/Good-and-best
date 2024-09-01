import { defineSchema, defineTable} from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  //Define UserType table 
  userTypes: defineTable({
    UserType: v.string(), 
  }),
  
  //Define User Table 
  users: defineTable({
      tokenIdentifier: v.string(),
      email: v.string(),
      userTypeID: v.id("userTypes"),
      userName: v.string(),
      address: v.string(),
      phoneNumber: v.string(),
  }).index("by_token", ["tokenIdentifier"]),

  //Define the size table
  size: defineTable({
    productID : v.id("products"),//Foreign key reference to product table
    SizeRegion: v.string(),
    SizeValue:v.string(),
  })
  .index("by_product",["productID"]),// Index for querying by productID

  // Define the orders table
  orders: defineTable({
    userID: v.id("users"),   // Foreign key reference to users table
    sizeID: v.id("size"),
    orderDate: v.string(),   // Store date as a string in ISO format
    totalAmount: v.number(),
    status: v.string(),
  })
  .index("by_user", ["userID"])  // Index for querying by userID
  .index("by_size",["sizeID"]), // Index for querying by SizeID

  // Define the order history table
  orderHistory: defineTable({
    orderID: v.id("orders"),   // Foreign key reference to orders table
    eventsDate: v.string(),    // Store date as a string in ISO format
  })
  .index("by_order", ["orderID"]),  // Index for querying by orderID

  // Define the product attributes table
  productAttributes: defineTable({
    attributeName: v.string(),  // Attribute name
    attributeValue: v.string(), // Attribute value
    ProductID: v.id("products") // Foreign key reference to product table
  })
  .index("by_product",["ProductID"]),

  // Define the product table
  products: defineTable({
    productCategoryID: v.id("ProductCategory"),  // Foreign key reference to product categories table
    brand: v.string(),
    productName: v.string(),
    Series:v.string(),
    price: v.number(),
  })
  .index("by_category", ["productCategoryID"]),  // Index for querying by product category

  // Define the order details table
  orderDetails: defineTable({
    orderID: v.id("orders"),    // Foreign key reference to orders table
    productID: v.id("products"), // Foreign key reference to products table
    quantity: v.number(),
    price: v.number(),
  })
  .index("by_order", ["orderID"])  // Index for querying by orderID
  .index("by_product", ["productID"]),  // Index for querying by productID

  // Define the image storage table
  imageStorage: defineTable({
    storageID: v.string(),      // Unique identifier for the image storage
    productID: v.id("products"), // Foreign key reference to products table
  })
  .index("by_product", ["productID"]),  // Index for querying by productID

  //Define the ProductCategory Table 
  ProductCategory:defineTable({
    categoryName:v.string(), // Category name for the product
  })
  .index("by_name", ["categoryName"]),

  // Define the stock table
  stock: defineTable({
    productID: v.id("products"),  // Foreign key reference to products table
    stockQuantity: v.number(),    // Quantity of stock available
  })
  .index("by_product", ["productID"]),  // Index for querying by productID

});