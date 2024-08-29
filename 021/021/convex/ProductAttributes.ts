import { mutation } from "./_generated/server";

const rackets = [
    { attributeName: "Frame", attributeValue: "HM Graphite, CFR, Tungsten" },
    { attributeName: "Shaft", attributeValue: "HM Graphite, 2G-Namd™ FLEX FORCE, Ultra PE Fiber" },
    { attributeName: "Weight", attributeValue: "4U (Avg. 83g) G5,6" },
    { attributeName: "String Tension", attributeValue: "20 - 28 lbs" },
    { attributeName: "Color", attributeValue: "Silver / Black" },
    { attributeName: "Manufactured", attributeValue: "Japan" },
    { attributeName: "Length", attributeValue: "5 mm longer" },
    { attributeName: "Play Style", attributeValue: "Power" },
    { attributeName: "Frame", attributeValue: "HM Graphite, CSR, Tungsten" },
    { attributeName: "Shaft", attributeValue: "HM Graphite, 2G-Namd™ FLEX FORCE" },
    { attributeName: "Weight", attributeValue: "4U (Avg. 83g) G5,6" },
    { attributeName: "String Tension", attributeValue: "20 - 28 lbs" },
    { attributeName: "Color", attributeValue: "Black / Silver" },
    { attributeName: "Manufactured", attributeValue: "Taiwan" },
    { attributeName: "Length", attributeValue: "10 mm longer" },
    { attributeName: "Play Style", attributeValue: "Power" },
    { attributeName: "Frame", attributeValue: "Graphite" },
    { attributeName: "Shaft", attributeValue: "Graphite" },
    { attributeName: "Weight", attributeValue: "4U (Avg. 83g) G5,6" },
    { attributeName: "String Tension", attributeValue: "20 - 28 lbs" },
    { attributeName: "Color", attributeValue: "Lightning Yellow" },
    { attributeName: "Manufactured", attributeValue: "China" },
    { attributeName: "Length", attributeValue: "10 mm longer" },
    { attributeName: "Play Style", attributeValue: "Speed" },
    { attributeName: "Frame", attributeValue: "HM Graphite, Flex Fuse, Tungsten" },
    { attributeName: "Shaft", attributeValue: "HM Graphite, Namd™, Ultra PE Fiber" },
    { attributeName: "Weight", attributeValue: "4U (Avg. 83g) G5,6" },
    { attributeName: "String Tension", attributeValue: "19 - 27 lbs" },
    { attributeName: "Color", attributeValue: "High orange" },
    { attributeName: "Manufactured", attributeValue: "Japan" },
    { attributeName: "Length", attributeValue: "10 mm longer" },
    { attributeName: "Play Style", attributeValue: "All-Round" },
    { attributeName: "Frame", attributeValue: "HM Graphite, Black Micro Core, Nanometric" },
    { attributeName: "Shaft", attributeValue: "HM Graphite, Namd™" },
    { attributeName: "Weight", attributeValue: "4U (Avg.83g) G5, 6" },
    { attributeName: "String Tension", attributeValue: "20 - 28 lbs" },
    { attributeName: "Color", attributeValue: "Kurenai, Dark Navy" },
    { attributeName: "Manufactured", attributeValue: "Japan" },
    { attributeName: "Length", attributeValue: "10 mm longer" },
    { attributeName: "Play Style", attributeValue: "Speed" },
  ];
  
  const shuttles = [
    { attributeName: "Material", attributeValue: "Duck Feather" },
    { attributeName: "Speed", attributeValue: "Speed 4" },
    { attributeName: "Quantity", attributeValue: "12" },
    { attributeName: "Material", attributeValue: "Duck Feather" },
    { attributeName: "Speed", attributeValue: "Speed 4" },
    { attributeName: "Quantity", attributeValue: "12" },
    { attributeName: "Material", attributeValue: "Nylon" },
    { attributeName: "Speed", attributeValue: "Middle" },
    { attributeName: "Quantity", attributeValue: "6" },
    { attributeName: "Material", attributeValue: "Goose Feather" },
    { attributeName: "Speed", attributeValue: "78" },
    { attributeName: "Quantity", attributeValue: "12" },
    { attributeName: "Material", attributeValue: "Goose Feather" },
    { attributeName: "Speed", attributeValue: "78" },
    { attributeName: "Quantity", attributeValue: "12" },
  ];
  
  const accessories = [
    { attributeName: "Type", attributeValue: "String" },
    { attributeName: "Color", attributeValue: "Lime Green" },
    { attributeName: "Gauge", attributeValue: "0.68 mm" },
    { attributeName: "Length", attributeValue: "10m" },
    { attributeName: "Type", attributeValue: "String" },
    { attributeName: "Color", attributeValue: "Red" },
    { attributeName: "Gauge", attributeValue: "0.65mm" },
    { attributeName: "Length", attributeValue: "10m" },
    { attributeName: "Type", attributeValue: "String" },
    { attributeName: "Color", attributeValue: "Flash Yellow" },
    { attributeName: "Gauge", attributeValue: "0.69mm" },
    { attributeName: "Length", attributeValue: "10m" },
    { attributeName: "Type", attributeValue: "Overgrip" },
    { attributeName: "Color", attributeValue: "Orange" },
    { attributeName: "Gauge", attributeValue: "0.6mm" },
    { attributeName: "Length", attributeValue: "1050mm" },
    { attributeName: "Type", attributeValue: "Overgrip" },
    { attributeName: "Color", attributeValue: "White" },
    { attributeName: "Gauge", attributeValue: "0.6mm" },
    { attributeName: "Length", attributeValue: "1050mm" },
  ];
  
// Define the mutation to insert product attributes
export const insertProductAttributes = mutation(async (ctx) => {
    const productAttributes = [...rackets, ...shuttles, ...accessories];
  
    for (const attribute of productAttributes) {
      // Check if the attribute already exists using a query
      const existingAttribute = await ctx.db.query("productAttributes")
        .filter(q => q.eq("attributeName", attribute.attributeName))
        .filter(q => q.eq("attributeValue", attribute.attributeValue))
        .first();
  
      if (existingAttribute) {
        console.log(`Attribute "${attribute.attributeName}" with value "${attribute.attributeValue}" already exists.`);
        continue; // Skip to the next item if it exists
      }
  
      // Insert the new attribute if it doesn't exist
      const insertedID = await ctx.db.insert("productAttributes", {
        attributeName: attribute.attributeName,
        attributeValue: attribute.attributeValue,
      });
  
      console.log(`Inserted attribute "${attribute.attributeName}" with value "${attribute.attributeValue}" and ID: ${insertedID}`);
    }
  });