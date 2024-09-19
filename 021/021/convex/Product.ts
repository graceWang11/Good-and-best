import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const insertProducts = mutation({
  args: {}, // No arguments needed as data is hardcoded

  handler: async (ctx) => {
    const products = [
        { categoryname: "Rackets", brand: "Yonex", series: "ASTROX", productName: "ASTROX 88 S PRO", price: 269 },
        { categoryname: "Rackets", brand: "Yonex", series: "ASTROX", productName: "ASTROX 88 D TOUR", price: 249 },
        { categoryname: "Rackets", brand: "Yonex", series: "NANOFLARE", productName: "NANOFLARE 1000 PLAY", price: 150 },
        { categoryname: "Rackets", brand: "Yonex", series: "ASTROX", productName: "ASTROX 77 PRO", price: 249 },
        { categoryname: "Rackets", brand: "Yonex", series: "ASTROX", productName: "ASTROX 100ZZ", price: 359 },
        { categoryname: "Rackets", brand: "Victor", series: "THRUSTER", productName: "TK-RYUGA II PRO B", price: 269 },
        { categoryname: "Rackets", brand: "Victor", series: "THRUSTER", productName: "Thruster K Falcon", price: 259 },
        { categoryname: "Rackets", brand: "Victor", series: "BRAVE SWORD", productName: "BRAVE SWORD 12N", price: 249 },
        { categoryname: "Rackets", brand: "Victor", series: "AuraSpeed", productName: "AuraSpeed 90F", price: 219 },
        { categoryname: "Rackets", brand: "Li-Ning", series: "Halbertec", productName: "Halbertec 7000", price: 249 },
        { categoryname: "Rackets", brand: "Li-Ning", series: "Bladex", productName: "Bladex 800", price: 299 },
        { categoryname: "Rackets", brand: "Li-Ning", series: "AxForce", productName: "AxForce 100 Kilin", price: 269 },
        { categoryname: "Shoes", brand: "Yonex", series: "-", productName: "Power Cushion 65Z 3", price: 209 },
        { categoryname: "Shoes", brand: "Yonex", series: "-", productName: "Power Cushion 65X 3", price: 199 },
        { categoryname: "Shoes", brand: "Yonex", series: "-", productName: "Power Cushion Comfort Z 3", price: 229 },
        { categoryname: "Shoes", brand: "Yonex", series: "-", productName: "Power Cushion 88 DIAL 3", price: 279 },
        { categoryname: "Shoes", brand: "Yonex", series: "-", productName: "Power Cushion SHB65XLEX", price: 189 },
        { categoryname: "Shoes", brand: "Kawasaki", series: "-", productName: "Anti-Slippery K-530", price: 159 },
        { categoryname: "Shoes", brand: "Li-Ning", series: "-", productName: "Ultra 2", price: 109 },
        { categoryname: "Shoes", brand: "Li-Ning", series: "-", productName: "AYTS034-6", price: 109 },
        { categoryname: "Shoes", brand: "Victor", series: "-", productName: "X Crayon ShinChan A39CS", price: 199 },
        { categoryname: "Shoes", brand: "Victor", series: "-", productName: "A970 Nitro Lite", price: 259 },
        { categoryname: "Accessories", brand: "Yonex", series: "EXBOLT", productName: "EXBOLT 68", price: 15 },
        { categoryname: "Accessories", brand: "Yonex", series: "EXBOLT", productName: "EXBOLT 65", price: 12 },
        { categoryname: "Accessories", brand: "Yonex", series: "NANOGY", productName: "NANOGY 95", price: 18 },
        { categoryname: "Shuttles", brand: "Yonex", series: "AS", productName: "AEROSENSA 10", price: 48 },
        { categoryname: "Shuttles", brand: "Yonex", series: "AS", productName: "AEROSENSA 20", price: 45 },
        { categoryname: "Shuttles", brand: "Yonex", series: "MAVIS", productName: "MAVIS 2000", price: 29 },
        { categoryname: "Shuttles", brand: "Victor", series: "Master", productName: "Master 1 Shuttlecock", price: 43 },
        { categoryname: "Shuttles", brand: "Victor", series: "Master", productName: "Master 3 Shuttlecock", price: 34 },
        { categoryname: "Shuttles", brand: "Victor", series: "AS-AIRSHUTTLE", productName: "AS-AIRSHUTTLE II", price: 28 },
        { categoryname: "Accessories", brand: "Victor", series: "GR", productName: "GR262-3", price: 12 },
        { categoryname: "Accessories", brand: "Victor", series: "GR", productName: "GR233-3", price: 12 },
    ];

    // Retrieve product categories
    const productCategories = await ctx.db.query("ProductCategory").collect();
    const categoryMap = productCategories.reduce((map, category) => {
      map[category.categoryName] = category._id;
      return map;
    }, {} as Record<string, Id<"ProductCategory">>);

    for (const product of products) {
      // Determine the productCategoryID before inserting the product
      const productCategoryID = categoryMap[product.categoryname];
      if (!productCategoryID) {
        console.log(`Category "${product.categoryname}" not found. Skipping product "${product.productName}".`);
        continue;
      }

      // Insert the product into the products table
      const insertedID = await ctx.db.insert("products", {
        productCategoryID, // Use the fetched productCategoryID
        brand: product.brand,
        productName: product.productName,
        Series: product.series,
        price: product.price,
      });

      console.log(`Inserted product "${product.productName}" with ID: ${insertedID}`);
    }
  },
});

export const getAll = query(async ({ db }) => {
  const products = await db.query("products").collect();
  return products; // Return all products
});

// Define the type for the returned product ID
type GetProductByImageIdResult = string | null;

export const getProductByImageId = query(async ({ db }, { imageId }: { imageId: string }): Promise<GetProductByImageIdResult> => {
  // Query the imageStorage table to get the productID associated with the imageId
  const imageRecord = await db.query("imageStorage").filter(q => q.eq("storageID", imageId)).first();

  if (!imageRecord) return null; // Handle case where image doesn't exist
  return imageRecord.productID;  // Return the productID from the imageStorage table
});


type ProductDetails = {
  productName: string;
  brand: string;
  price: number;
  series: string;
} | null;

export const getProductDetailsByImageId = query(async ({ db }, { imageId }: { imageId: string }): Promise<ProductDetails> =>{
  // Ensure imageId is defined
  if (!imageId) {
    console.log("Error: imageId is undefined or missing.");
    return null;
  }

  // Trim the imageId to avoid any issues with extra spaces or hidden characters
  const trimmedImageId = imageId.trim();

  // Get all records from imageStorage
  const allImageRecords = await db.query("imageStorage").collect();

  const imageRecord = allImageRecords.find(record => record.storageID === trimmedImageId);

  if (!imageRecord) {
    console.log(`No image found for imageId: ${trimmedImageId}`);
    return null;
  }

  const productID: Id<"products"> = imageRecord.productID
  // Log all records from the products table
  const allProductRecords = await db.query("products").collect();
  const productRecord = allProductRecords.find(record => record._id === productID)
  return {
    productName: productRecord?.productName || "Unknown Product",
    brand: productRecord?.brand || "Unknown Brand",
    series: productRecord?.Series || "Unknown Series",
    price: productRecord?.price ?? 0, // Use 0 as the default price
  };
});

//Function to query the Victor products 
export const getBrandProducts = query(async ({ db },{brandName}:{brandName :string | undefined}) => {
  // Fetch all products
  const allProducts = await db.query("products").collect();

  // Filter products with brand "Victor" (case-insensitive)
  const brandProducts = allProducts.filter(product =>
    product.brand.trim().toLowerCase() === brandName?.trim().toLowerCase()
  );

  if (!brandProducts || brandProducts.length === 0) {
    console.log(`No products found for brand: ${brandName}`);
    return [];
  }

  const productIds = await db.query("imageStorage").collect();

  const brandProductsWithImages = brandProducts.map(product => {
    const imageRecord = productIds.find(record => record.productID === product._id);
    return {
      productId: imageRecord ? imageRecord.productID : null,
      storageID: imageRecord ? imageRecord.storageID : null,
    };
  });
  // Join with productCategory table and log the results
  const brandProductsWithCategory = await Promise.all(
    brandProducts.map(async (product) => {
      const category = await db.get(product.productCategoryID);
      return {
        product:product._id,
        productName: product.productName,
        brand: product.brand,
        series: product.Series,
        price: product.price,
        categoryName: category?.categoryName || "Unknown Category", // Use a fallback if category is missing
      };
    })
  );

  return {
    brandProductsWithCategory,
    brandProductsWithImages
  };
});

