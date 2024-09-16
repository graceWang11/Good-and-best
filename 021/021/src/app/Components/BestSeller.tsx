// "use client";

// import { useEffect } from "react";
// import { useMutation } from "convex/react";
// import { api } from "../../../convex/_generated/api";
// import { useQuery } from "convex/react";
// import BestSellerCard from "./BestSellerCard"

// function BestSeller() {
//     const bestPic1 = useQuery(api.imageStorage.getImageUrl, { imageId: "kg26whsnx2wc31779p2m5e7r1x6z8tqf" });
//     const bestPic2 = useQuery(api.imageStorage.getImageUrl, { imageId: "kg26whsnx2wc31779p2m5e7r1x6z8tqf" });
//     const bestPic3 = useQuery(api.imageStorage.getImageUrl, { imageId: "kg26whsnx2wc31779p2m5e7r1x6z8tqf" });
//     const bestPic4 = useQuery(api.imageStorage.getImageUrl, { imageId: "kg26whsnx2wc31779p2m5e7r1x6z8tqf" });
//     const product1 = "Product 1"
//     const product2 = "Product 2"
//     const product3 = "Product 3"
//     const product4 = "Product 4"

//     return (
//         <div>
//             <div className="container px-4 py-5">
//                 <h1 className="pb-2 border-bottom text-center" style={{ color: '#CD5C08' }}>Best Seller</h1>
//             </div>
//             <div  style={styles.row}>
//                 <BestSellerCard pic={bestPic1} name={product1} />
//                 <BestSellerCard pic={bestPic2} name={product2} />
//                 <BestSellerCard pic={bestPic3} name={product3} />
//                 <BestSellerCard pic={bestPic4} name={product4} />
//             </div>
//         </div>
//     )
    
// }

// const styles = {
//     row: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       gap: '70px',
//       margin: '20px 0',
//     },
//   };

// export default BestSeller;