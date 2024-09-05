import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";



export const getImageUrl = query(async ({ storage }, args: { imageId: string }) => {
  const url = await storage.getUrl(args.imageId);
  return url;
});


export const insertImageWithDescription = mutation(async (ctx) => {

  // Fetch all products from the database
  const products = await ctx.db.query("products").collect();

  // Create a map of product names to their IDs
  const productMap = products.reduce((map, product) => {
    const productKey = product.productName.trim().toLowerCase();
    map[productKey] = product._id;
    return map;
  }, {} as Record<string, Id<"products">>);

  // Manually add the images with descriptions (product names)
  const images = [
    { storageID: "kg2fryph00007f8qseszddhxq1702b1a", description: "Halbertec 7000" },
    { storageID: "kg267jy3390t80s3fys2kwfa4x702rfs", description: "AxForce 100 Kilin" },
    { storageID: "kg2bhqtxtxp66fbcnzx3zfvsn9703z2f", description: "Bladex 800" },
    { storageID: "kg23vvctcj0hxpdwyt3ba4rev5702xhj", description: "TK-RYUGA II PRO B" },
    { storageID: "kg27tgd7a8srj70ywerbbfxtxx702k67", description: "Thruster K Falcon" },
    { storageID: "kg239xhhfnsgt44qq75rgcjwx5702w8p", description: "BRAVE SWORD 12N" },
    { storageID: "kg2d99npj5qv0ams75jssrfv7h703s15", description: "AuraSpeed 90F" },
    { storageID: "kg29abq460e2sgt5zgwp13axyd70325z", description: "NANOFLARE 1000 PLAY" },
    { storageID: "kg29cw5mfsnj0k7tx8ef1g73t5702rn0", description: "ASTROX 100ZZ" },
    { storageID: "kg26axh74bz155fs16r5n8p49h702xm2", description: "ASTROX 88 S PRO" },
    { storageID: "kg209vdnfvkcdv42r1g4dmemfd703cvp", description: "ASTROX 88 D TOUR" },
    { storageID: "kg2bhqtxtxp66fbcnzx3zfvsn9703z2f", description: "ASTROX 77 PRO" },
    // Shoes
    // Kawasaki
    { storageID: "kg2ahtxxhe6cc01jwn9hv2j8sn702gnb", description: "Anti-Slippery K-530" },
    // Li-Ning
    { storageID: "kg244t91tjq1eh1d9etdvg1wdx702343", description: "AYTS034-6" },
    { storageID: "kg2edpzse263b4mbs2hk9b5sh17030wf", description: "Ultra 2" },
    // Victor
    { storageID: "kg25c1fqe9kmpzdfqn35vpvm29702mhk", description: "X Crayon ShinChan A39CS" },
    { storageID: "kg28d7m07m7p5qt0xdf10k3qwx702ryb", description: "A970 Nitro Lite" },
    // Yonex
    { storageID: "kg26aecac6qaesqddvfhkmdbpd703dcr", description: "Power Cushion 65X 3" },
    { storageID: "kg20ac03q309fe8mexyzznent5702wfk", description: "Power Cushion SHB65XLEX" },
    { storageID: "kg2cyj96qcy3rd58q9ws844r4s703mdg", description: "Power Cushion 65Z 3" },
    { storageID: "kg28zc1816s1vcwrcqqygrkkc1703tn2", description: "Power Cushion 88 DIAL 3" },
    { storageID: "kg2bngkdbtqajmpw81ka3c0f2n703nk9", description: "Power Cushion Comfort Z 3" },
    // Shuttlecock
    // Victor
    { storageID: "kg2dg5n0kwafm3h5jze68x5cns7020gf", description: "Master 1 Shuttlecock" },
    { storageID: "kg2ez26t02wwzzw6rq6mgk0pm1702a8h", description: "AS-AIRSHUTTLE II" },
    { storageID: "kg288eq1tjpddcpy14rc1cqc9n702p5y", description: "Master 3 Shuttlecock" },
    // Yonex
    { storageID: "kg2fgztac54v1gwpa8srpt3vzs702n68", description: "AEROSENSA 10" },
    { storageID: "kg27zadkxw0vsp8x59vsav319d703epc", description: "AEROSENSA 20" },
    { storageID: "kg26ykke416be7ssvtyzybykq1703t8q", description: "MAVIS 2000" },
    // Accessory
    // Victor
    { storageID: "kg28e3we9qq1zbv55yn2x5w74n703jv7", description: "GR233-3" },
    { storageID: "kg28g5xjknvs9mnhhx2gmjy6h1703rm2", description: "GR262-3" },
    // Yonex
    { storageID: "kg2dgja4p3ezxb4hskw2bzgncs702zq1", description: "EXBOLT 65" },
    { storageID: "kg241vamf7kkasszpy3mc89pe1703xnb", description: "EXBOLT 68" },
    { storageID: "kg2ex00d58rgdrb5gasg0fpzx9702kav", description: "NANOGY 95" },
  ];
  

  for (const { storageID, description } of images) {
    const productID = productMap[description.trim().toLowerCase()];

    if (!productID) {
      console.log(`Product "${description}" not found. Skipping.`);
      continue;
    }
    

    // Ensure the productID is valid before inserting
    if (productID) {
      await ctx.db.insert("imageStorage", {
        storageID: storageID,
        productID: productID,
      });
      console.log(`Inserted image "${storageID}" for product "${description}" with ProductID: ${productID}`);
    } else {
      console.log(`Failed to find matching product for "${description}".`);
    }
  }
});


export const fetchAllImageUrls = query(async ({ storage, db }) => {
  const images = await db.query("imageStorage").collect(); // Fetch all image records
  
  const urls = await Promise.all(
    images.map(async (image) => {
      const url = await storage.getUrl(image.storageID);
      console.log(`Image URL for storageID ${image.storageID}: ${url}`);  // Log URLs
      const product = await db.get(image.productID);  // Fetch product details
      return { url, productID: image.productID, productName: product?.productName || 'Unknown Product' };
    })
  );
  
  return urls;
});