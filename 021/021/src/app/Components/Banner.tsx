"use client";

import { useQuery } from "convex/react"; // Hook to fetch data
import { api } from "../../../convex/_generated/api"; // API for fetching images and products
import Image from "next/image"; // Next.js Image component
import styles from './Banner.module.css';
import { getProductDetailsByImageId } from '../../../convex/Product';


export default function Banner() {
  // Fetch background image URL
  const backgroundImageUrl = useQuery(api.imageStorage.getImageUrl, {
    imageId: "kg27npv7b87jbd25jx8tj1c4x570tg8q",
  });

  // Fetch left-side image URL and its associated product ID
  const leftImageUrl = useQuery(api.imageStorage.getImageUrl, {
    imageId: "kg25c1fqe9kmpzdfqn35vpvm29702mhk",
  });
  
  // Fetch the product ID associated with the left-side image
  const productIdFromImage = useQuery(api.Product.getProductByImageId, {
    imageId: "kg25c1fqe9kmpzdfqn35vpvm29702mhk",
  });

  // Fetch product details using the product ID from the image
  const productDetails = useQuery(api.Product.getProductDetailsByImageId, {
    imageId: "kg25c1fqe9kmpzdfqn35vpvm29702mhk", // Correctly passing the imageId
  });

  if (!backgroundImageUrl) {
    return <div>Loading...</div>; // Display loading while fetching data
  }
  if(!leftImageUrl){
    return<div>123</div>
  }
//   if(!productDetails){
//     return<div>456</div>
//   }

return (
    <div
      className={styles.bannerContainer}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover", // Keep the background covering but not overlapping
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.productImageWrapper}>
          {/* Left Image */}
          <Image
            src={leftImageUrl}
            alt={productDetails?.productName|| "Product Image"}
            width={200}
            height={200}
            className={styles.productImage}
          />
        </div>

        {/* Product Details */}
        <div className={styles.productDetails}>
          <h2 className={styles.productTitle}>
            {productDetails?.productName || "Unknown Product"}
          </h2>
          <p className={styles.productBrand}>
            {productDetails?.brand || "Unknown Brand"}
          </p>
          <p className={styles.productPrice}>
            {productDetails?.price ? `$${productDetails.price}` : "Price Unavailable"}
          </p>
          <div className={styles.buttonWrapper}>
            <a className={styles.shopButton} href="#">
              Shop now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}