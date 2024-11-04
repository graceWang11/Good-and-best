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
    //racket
    //Li-ning
    { storageID: "kg2fkfaewxcys0w0qqcymkh3dx73zg2s", description: "Halbertec 7000" },
    { storageID: "kg2355cdy9np2btq0m0yge1fkx73zeap", description: "AxForce 100 Kilin" },
    { storageID: "kg2072pedm64ccw6s3wv5yrczn73yxxs", description: "Bladex 800" },
    //Victor
    { storageID: "kg23jza237tncw818edqc2ya0x73yar9", description: "TK-RYUGA II PRO B" },
    { storageID: "kg2ar43kh39ph8ph3kafcybsqh73y9q7", description: "Thruster K Falcon" },
    { storageID: "kg27m06hth0pd93nnxntdkgfe173y6dq", description: "BRAVE SWORD 12N" },
    { storageID: "kg2ah5hj9ebwfmd58q461tnv5n73zyv9", description: "AuraSpeed 90F" },
    //Yonex
    { storageID: "kg20n53r127a0qynx5vgrqydes73zetr", description: "NANOFLARE 1000 PLAY" },
    { storageID: "kg2f9hjjnj8dvek2j27d6hmr5d73yt5h", description: "ASTROX 100ZZ" },
    { storageID: "kg2cv0j16qc41vw8sd51kb80vd73ydx8", description: "ASTROX 88 S PRO" },
    { storageID: "kg25611th55cqkb0v4b4smacq573z6ph", description: "ASTROX 88 D TOUR" },
    { storageID: "kg2f6fmr08gtg88x6t980fmdh973z70w", description: "ASTROX 77 PRO" },
    // Shoes
    // Kawasaki
    { storageID: "kg27157xch3r7ebn9w2bzw6rcd73zht0", description: "Anti-Slippery K-530" },
    // Li-Ning
    { storageID: "kg2410z4by5q13744qeaesnb8x73z7km", description: "AYTS034-6" },
    { storageID: "kg23pm2cppzx6bgkj6yjw44krn73yw7y", description: "Ultra 2" },
    // Victor
    { storageID: "kg2ear7kg4mpspvb00qycgqnjx73z92f", description: "X Crayon ShinChan A39CS" },
    { storageID: "kg2bgkckr01ey2jsptq4kv02wh73yp1y", description: "A970 Nitro Lite" },
    // Yonex
    { storageID: "kg287xkxkp53x92f73n7sarce173yg5p", description: "Power Cushion 65X 3" },
    { storageID: "kg278wrhxbmgwwe3w3t4a6h10n73z4re", description: "Power Cushion SHB65XLEX" },
    { storageID: "kg2bpb2v00ty10hc9a5jky5jvx73zeb1", description: "Power Cushion 65Z 3" },
    { storageID: "kg27fcm4qkz36gwmmggc28zbh173ze8x", description: "Power Cushion 88 DIAL 3" },
    { storageID: "kg25jmwsbayebks6ty07kaw2as73zdfp", description: "Power Cushion Comfort Z 3" },
    // Shuttlecock
    // Victor
    { storageID: "kg28yqynv4nx541bsrytd9912n73y3bb", description: "Master 1 Shuttlecock" },
    { storageID: "kg28dt2nrwvs8cvnk1h08ypht973yhbx", description: "AS-AIRSHUTTLE II" },
    { storageID: "kg20btwzvezq2se5gptxqbmnm973ztw8", description: "Master 3 Shuttlecock" },
    // Yonex
    { storageID: "kg289xc3cmbeqfe7tr2tsd91ex73zsyc", description: "AEROSENSA 10" },
    { storageID: "kg21g72mhkxmq5t29q3d54t42s73ycgk", description: "AEROSENSA 20" },
    { storageID: "kg27gcb0tacym496nt0pd0xawn73ytev", description: "MAVIS 2000" },
    // Accessory
    // Victor
    { storageID: "kg2bhzs3f5vgpmcv7btp9t8c6173z9k9", description: "GR233-3" },
    { storageID: "kg26jf321svjaqkdt0tcaq1dv973znc1", description: "GR262-3" },
    // Yonex
    { storageID: "kg200pr46qsmy9hft8q0r8tbxx73zg83", description: "EXBOLT 65" },
    { storageID: "kg21pr1aybp9adq6s7ggfd52wn73ykft", description: "EXBOLT 68" },
    { storageID: "kg26bg86c40nyepeepqjgs18fn73yxr6", description: "NANOGY 95" },
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
