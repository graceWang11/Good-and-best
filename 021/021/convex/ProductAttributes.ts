import { mutation } from "./_generated/server";

// Example data to insert into the ProductAttributes table
const productAttributes = [
  { attributeName: "Frame", attributeValue: "HM Graphite, CFR, Tungsten" },
  { attributeName: "Shaft", attributeValue: "HM Graphite, 2G-Namd™ FLEX FORCE, Ultra PE Fiber" },
  { attributeName: "Weight", attributeValue: "4U (Avg. 83g) G5,6" },
  { attributeName: "String Tension", attributeValue: "20 - 28 lbs" },
  { attributeName: "Color", attributeValue: "Silver / Black" },
  { attributeName: "Length", attributeValue: "5 mm longer" },
  { attributeName: "Play Style", attributeValue: "Power" }
];

// Define the mutation to insert product attributes
export const insertProductAttributes = mutation(async (ctx) => {
  for (const attribute of productAttributes) {
    // Check if the attribute already exists using a query
    const existingAttribute = await ctx.db.query("productAttributes")
      .filter(q => q.eq("attributeName", attribute.attributeName))
      .first();

    if (existingAttribute) {
      console.log(`Attribute "${attribute.attributeName}" already exists.`);
      continue; // Skip to the next item if it exists
    }

    // Insert the new attribute if it doesn't exist
    const insertedID = await ctx.db.insert("productAttributes", {
      attributeName: attribute.attributeName,
      attributeValue: attribute.attributeValue,
    });

    console.log(`Inserted attribute "${attribute.attributeName}" with ID: ${insertedID}`);
  }
});

