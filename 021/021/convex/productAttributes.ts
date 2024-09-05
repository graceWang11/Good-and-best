import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const insertProductAttributes = mutation(async (ctx) => {
  // Fetch all products from the database
  const products = await ctx.db.query("products").collect();

  // Create a map of product names to their IDs
  const productMap = products.reduce((map, product) => {
    const productKey = `${product.brand} ${product.Series} ${product.productName}`.toLowerCase().trim();
    map[productKey] = product._id;
    return map;
  }, {} as Record<string, Id<"products">>);

  // Complete attributes data
  const attributesData = [
    { brand: "Yonex", series: "ASTROX", productName: "ASTROX 88 S PRO", attributes: [
      { attributeName: "Frame", attributeValue: "HM Graphite, CFR, Tungsten" },
      { attributeName: "Shaft", attributeValue: "HM Graphite, 2G-Namd™ FLEX FORCE, Ultra PE Fiber" },
      { attributeName: "Weight", attributeValue: "4U (Avg. 83g) G5,6" },
      { attributeName: "String Tension", attributeValue: "20 - 28 lbs" },
      { attributeName: "Color", attributeValue: "Silver / Black" },
      { attributeName: "Manufactured", attributeValue: "Japan" },
      { attributeName: "Length", attributeValue: "5 mm longer" },
      { attributeName: "Play Style", attributeValue: "Power" },
    ]},
    { brand: "Yonex", series: "ASTROX", productName: "ASTROX 88 D TOUR", attributes: [
      { attributeName: "Frame", attributeValue: "HM Graphite, CSR, Tungsten" },
      { attributeName: "Shaft", attributeValue: "HM Graphite, 2G-Namd™ FLEX FORCE" },
      { attributeName: "Weight", attributeValue: "4U (Avg. 83g) G5,6" },
      { attributeName: "String Tension", attributeValue: "20 - 28 lbs" },
      { attributeName: "Color", attributeValue: "Black / Silver" },
      { attributeName: "Manufactured", attributeValue: "Taiwan" },
      { attributeName: "Length", attributeValue: "10 mm longer" },
      { attributeName: "Play Style", attributeValue: "Power" },
    ]},
    { brand: "Yonex", series: "NANOFLARE", productName: "NANOFLARE 1000 PLAY", attributes: [
      { attributeName: "Frame", attributeValue: "Graphite" },
      { attributeName: "Shaft", attributeValue: "Graphite" },
      { attributeName: "Weight", attributeValue: "4U (Avg. 83g) G5,6" },
      { attributeName: "String Tension", attributeValue: "20 - 28 lbs" },
      { attributeName: "Color", attributeValue: "Lightning Yellow" },
      { attributeName: "Manufactured", attributeValue: "China" },
      { attributeName: "Length", attributeValue: "10 mm longer" },
      { attributeName: "Play Style", attributeValue: "Speed" },
    ]},
    { brand: "Yonex", series: "ASTROX", productName: "ASTROX 77 PRO", attributes: [
      { attributeName: "Frame", attributeValue: "HM Graphite, Flex Fuse, Tungsten" },
      { attributeName: "Shaft", attributeValue: "HM Graphite, Namd™, Ultra PE Fiber" },
      { attributeName: "Weight", attributeValue: "4U (Avg. 83g) G5,6" },
      { attributeName: "String Tension", attributeValue: "19 - 27 lbs" },
      { attributeName: "Color", attributeValue: "High orange" },
      { attributeName: "Manufactured", attributeValue: "Japan" },
      { attributeName: "Length", attributeValue: "10 mm longer" },
      { attributeName: "Play Style", attributeValue: "All-Round" },
    ]},
    { brand: "Yonex", series: "ASTROX", productName: "ASTROX 100ZZ", attributes: [
      { attributeName: "Frame", attributeValue: "HM Graphite, Black Micro Core, Nanometric" },
      { attributeName: "Shaft", attributeValue: "HM Graphite, Namd™" },
      { attributeName: "Weight", attributeValue: "4U (Avg. 83g) G5, 6" },
      { attributeName: "String Tension", attributeValue: "20 - 28 lbs" },
      { attributeName: "Color", attributeValue: "Kurenai, Dark Navy" },
      { attributeName: "Manufactured", attributeValue: "Japan" },
      { attributeName: "Length", attributeValue: "10 mm longer" },
      { attributeName: "Play Style", attributeValue: "Speed" },
    ]},
    { brand: "Victor", series: "THRUSTER", productName: "TK-RYUGA II PRO B", attributes: [
      { attributeName: "Frame", attributeValue: "High Resilience Modulus Graphite" },
      { attributeName: "Shaft", attributeValue: "High Resilience Modulus Graphite, PYROFIL" },
      { attributeName: "Weight", attributeValue: "3U/G5" },
      { attributeName: "String Tension", attributeValue: "≤32 lbs" },
      { attributeName: "Color", attributeValue: "Dragon Scale Graphics" },
      { attributeName: "Manufactured", attributeValue: "China" },
      { attributeName: "Length", attributeValue: "675mm" },
      { attributeName: "Play Style", attributeValue: "Power" },
    ]},
    { brand: "Victor", series: "THRUSTER", productName: "Thruster K Falcon", attributes: [
      { attributeName: "Frame", attributeValue: "High Resilience Modulus Graphite, PYROFIL" },
      { attributeName: "Shaft", attributeValue: "High Resilience Modulus Graphite, PYROFIL" },
      { attributeName: "Weight", attributeValue: "5U / G5, G6" },
      { attributeName: "String Tension", attributeValue: "≤ 30 lbs" },
      { attributeName: "Color", attributeValue: "Black" },
      { attributeName: "Manufactured", attributeValue: "China" },
      { attributeName: "Length", attributeValue: "675mm" },
      { attributeName: "Play Style", attributeValue: "Speed" },
    ]},
    { brand: "Victor", series: "BRAVE SWORD", productName: "BRAVE SWORD 12N", attributes: [
      { attributeName: "Frame", attributeValue: "Ultra High Modulus Graphite, Nano Resin" },
      { attributeName: "Shaft", attributeValue: "Ultra High Modulus Graphite, Nano Resin" },
      { attributeName: "Weight", attributeValue: "3U / G5" },
      { attributeName: "String Tension", attributeValue: "≤ 30 lbs" },
      { attributeName: "Color", attributeValue: "Black" },
      { attributeName: "Manufactured", attributeValue: "China" },
      { attributeName: "Length", attributeValue: "675mm" },
      { attributeName: "Play Style", attributeValue: "All-Round" },
    ]},
    { brand: "Victor", series: "AuraSpeed", productName: "AuraSpeed 90F", attributes: [
      { attributeName: "Frame", attributeValue: "High Resilience Modulus Graphite, Nano Fortify TR" },
      { attributeName: "Shaft", attributeValue: "Ultra High Modulus Graphite, Nano Resin" },
      { attributeName: "Weight", attributeValue: "4U / G6" },
      { attributeName: "String Tension", attributeValue: "≤28 lbs" },
      { attributeName: "Color", attributeValue: "Light Blue" },
      { attributeName: "Manufactured", attributeValue: "Taiwan" },
      { attributeName: "Length", attributeValue: "675mm" },
      { attributeName: "Play Style", attributeValue: "Speed" },
    ]},
    { brand: "Li-Ning", series: "Halbertec", productName: "Halbertec 7000", attributes: [
      { attributeName: "Frame", attributeValue: "High Tensile Slim Frame" },
      { attributeName: "Shaft", attributeValue: "Ultra-Strong Carbon Fiber" },
      { attributeName: "Weight", attributeValue: "3U / G5" },
      { attributeName: "String Tension", attributeValue: "≤ 28 lbs" },
      { attributeName: "Color", attributeValue: "Green/Orange" },
      { attributeName: "Manufactured", attributeValue: "China" },
      { attributeName: "Length", attributeValue: "675mm" },
      { attributeName: "Play Style", attributeValue: "All-Round" },
    ]},
    { brand: "Li-Ning", series: "Bladex", productName: "Bladex 800", attributes: [
      { attributeName: "Frame", attributeValue: "Dynamic Optimum Frame" },
      { attributeName: "Shaft", attributeValue: "Ultra High Modulus Graphite" },
      { attributeName: "Weight", attributeValue: "3U / G5" },
      { attributeName: "String Tension", attributeValue: "≤ 31 lbs" },
      { attributeName: "Color", attributeValue: "Black Red" },
      { attributeName: "Manufactured", attributeValue: "China" },
      { attributeName: "Length", attributeValue: "675mm" },
      { attributeName: "Play Style", attributeValue: "Speed" },
    ]},
    { brand: "Li-Ning", series: "AxForce", productName: "AxForce 100 Kilin", attributes: [
      { attributeName: "Frame", attributeValue: "TB Nano" },
      { attributeName: "Shaft", attributeValue: "M50" },
      { attributeName: "Weight", attributeValue: "4U/W2" },
      { attributeName: "String Tension", attributeValue: "≤ 31 lbs" },
      { attributeName: "Color", attributeValue: "Black" },
      { attributeName: "Manufactured", attributeValue: "China" },
      { attributeName: "Length", attributeValue: "675mm" },
      { attributeName: "Play Style", attributeValue: "All-Round" },
    ]},
    { brand: "Yonex", series: "-", productName: "Power Cushion 65Z 3", attributes: [
      { attributeName: "Color", attributeValue: "White/Blue" },
      { attributeName: "Gender", attributeValue: "Men" },
    ]},
    { brand: "Yonex", series: "-", productName: "Power Cushion 65X 3", attributes: [
      { attributeName: "Color", attributeValue: "White/ Orange" },
      { attributeName: "Gender", attributeValue: "UNISEX" },
    ]},
    { brand: "Yonex", series: "-", productName: "Power Cushion Comfort Z 3", attributes: [
      { attributeName: "Color", attributeValue: "Black" },
      { attributeName: "Gender", attributeValue: "Men" },
    ]},
    { brand: "Yonex", series: "-", productName: "Power Cushion 88 DIAL 3", attributes: [
      { attributeName: "Color", attributeValue: "White" },
      { attributeName: "Gender", attributeValue: "UNISEX" },
    ]},
    { brand: "Yonex", series: "-", productName: "Power Cushion SHB65XLEX", attributes: [
      { attributeName: "Color", attributeValue: "White/Mint" },
      { attributeName: "Gender", attributeValue: "UNISEX" },
    ]},
    { brand: "Kawasaki", series: "-", productName: "Anti-Slippery K-530", attributes: [
      { attributeName: "Color", attributeValue: "White/Blue" },
      { attributeName: "Gender", attributeValue: "UNISEX" },
    ]},
    { brand: "Li-Ning", series: "-", productName: "Ultra 2", attributes: [
      { attributeName: "Color", attributeValue: "White" },
      { attributeName: "Gender", attributeValue: "Men" },
    ]},
    { brand: "Li-Ning", series: "-", productName: "AYTS034-6", attributes: [
      { attributeName: "Color", attributeValue: "White" },
      { attributeName: "Gender", attributeValue: "UNISEX" },
    ]},
    { brand: "Victor", series: "-", productName: "X Crayon ShinChan A39CS", attributes: [
      { attributeName: "Color", attributeValue: "White/Blue" },
      { attributeName: "Gender", attributeValue: "UNISEX" },
    ]},
    { brand: "Victor", series: "-", productName: "A970 Nitro Lite", attributes: [
      { attributeName: "Color", attributeValue: "White" },
      { attributeName: "Gender", attributeValue: "Men" },
    ]},
    { brand: "Yonex", series: "EXBOLT", productName: "EXBOLT 68", attributes: [
      { attributeName: "Type", attributeValue: "String" },
      { attributeName: "Color", attributeValue: "Lime Green" },
      { attributeName: "Gauge", attributeValue: "0.68 mm" },
      { attributeName: "Length", attributeValue: "10m" },
    ]},
    { brand: "Yonex", series: "EXBOLT", productName: "EXBOLT 65", attributes: [
      { attributeName: "Type", attributeValue: "String" },
      { attributeName: "Color", attributeValue: "Red" },
      { attributeName: "Gauge", attributeValue: "0.65mm" },
      { attributeName: "Length", attributeValue: "10m" },
    ]},
    { brand: "Yonex", series: "NANOGY", productName: "NANOGY 95", attributes: [
      { attributeName: "Type", attributeValue: "String" },
      { attributeName: "Color", attributeValue: "Flash Yellow" },
      { attributeName: "Gauge", attributeValue: "0.69mm" },
      { attributeName: "Length", attributeValue: "10m" },
    ]},
    { brand: "Yonex", series: "AS", productName: "AEROSENSA 10", attributes: [
      { attributeName: "ShuttleID", attributeValue: "AS-10" },
      { attributeName: "Material", attributeValue: "Duck Feather" },
      { attributeName: "Speed", attributeValue: "Speed 4" },
      { attributeName: "Quantity", attributeValue: "12" },
    ]},
    { brand: "Yonex", series: "AS", productName: "AEROSENSA 20", attributes: [
      { attributeName: "ShuttleID", attributeValue: "AS-20" },
      { attributeName: "Material", attributeValue: "Duck Feather" },
      { attributeName: "Speed", attributeValue: "Speed 4" },
      { attributeName: "Quantity", attributeValue: "12" },
    ]},
    { brand: "Yonex", series: "MAVIS", productName: "MAVIS 2000", attributes: [
      { attributeName: "ShuttleID", attributeValue: "M-2000" },
      { attributeName: "Material", attributeValue: "Nylon" },
      { attributeName: "Speed", attributeValue: "Middle" },
      { attributeName: "Quantity", attributeValue: "6" },
    ]},
    { brand: "Victor", series: "Master", productName: "Master 1 Shuttlecock", attributes: [
      { attributeName: "ShuttleID", attributeValue: "master1" },
      { attributeName: "Material", attributeValue: "Goose Feather" },
      { attributeName: "Speed", attributeValue: "78" },
      { attributeName: "Quantity", attributeValue: "12" },
    ]},
    { brand: "Victor", series: "Master", productName: "Master 3 Shuttlecock", attributes: [
      { attributeName: "ShuttleID", attributeValue: "master3" },
      { attributeName: "Material", attributeValue: "Goose Feather" },
      { attributeName: "Speed", attributeValue: "78" },
      { attributeName: "Quantity", attributeValue: "12" },
    ]},
    { brand: "Victor", series: "AS-AIRSHUTTLE", productName: "AS-AIRSHUTTLE II", attributes: [
      { attributeName: "ShuttleID", attributeValue: "AS-AIRSHUTTLE2" },
      { attributeName: "Material", attributeValue: "Nylon" },
      { attributeName: "Speed", attributeValue: "Middle" },
      { attributeName: "Quantity", attributeValue: "6" },
    ]},
    { brand: "Victor", series: "GR", productName: "GR262-3", attributes: [
      { attributeName: "Type", attributeValue: "Overgrip" },
      { attributeName: "Color", attributeValue: "Orange" },
      { attributeName: "Gauge", attributeValue: "0.6mm" },
      { attributeName: "Length", attributeValue: "1050mm" },
    ]},
    { brand: "Victor", series: "GR", productName: "GR233-3", attributes: [
      { attributeName: "Type", attributeValue: "Overgrip" },
      { attributeName: "Color", attributeValue: "White" },
      { attributeName: "Gauge", attributeValue: "0.6mm" },
      { attributeName: "Length", attributeValue: "1050mm" },
    ]},
  ];

  for (const { brand, series, productName, attributes } of attributesData) {
    const productKey = `${brand} ${series} ${productName}`.toLowerCase().trim();
    const productID = productMap[productKey];

    if (!productID) {
      console.log(`Product "${brand} ${series} ${productName}" not found. Skipping attributes.`);
      continue;
    }

    for (const attribute of attributes) {
      await ctx.db.insert("productAttributes", {
        attributeName: attribute.attributeName,
        attributeValue: attribute.attributeValue,
        ProductID: productID,
      });
      console.log(`Inserted attribute "${attribute.attributeName}" for product "${productName}" with ProductID: ${productID}`);
    }
  }
});
