"use client";

import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image"; // Next.js Image component
import styles from './Banner.module.css';
import BrandImage from './BrandImage';  // Import the BrandImage component

// Map brand names to their respective image IDs
const brandImages: { [key: string]: string } = {
  Victor: "kg2f8ejqxpqbw7q2q86yxr8btd70rk4e",
  Yonex: "kg296tr2mg8j2vwvnyhb638a7d70tcfw",
  "Li-Ning": "kg29b486jhyebew0r40jbkr7kh70sbz8",
  Kawasaki: "kg24jtgpb1h03bytra51y14zw570sxhw",
};

export default function BannerWithCarousel() {
  // BrandCarousel logic
  const [brands, setBrands] = useState<string[]>([]);
  const products = useQuery(api.Product.getAll);

  useEffect(() => {
    if (products) {
      const uniqueBrands = Array.from(
        new Set(products.map((product: any) => product.brand))
      );
      setBrands(uniqueBrands);
    }
  }, [products]);

  // Banner logic
  const backgroundImageUrl = useQuery(api.imageStorage.getImageUrl, {
    imageId: "kg27npv7b87jbd25jx8tj1c4x570tg8q",
  });

  const leftImageUrl = useQuery(api.imageStorage.getImageUrl, {
    imageId: "kg25c1fqe9kmpzdfqn35vpvm29702mhk",
  });

  const productDetails = useQuery(api.Product.getProductDetailsByImageId, {
    imageId: "kg25c1fqe9kmpzdfqn35vpvm29702mhk",
  });

  // Error handling and loading
  if (!products || !backgroundImageUrl || !leftImageUrl || !productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Banner Section */}
      <div
        className={styles.bannerContainer}
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.productImageWrapper}>
            {/* Left Image */}
            <Image
              src={leftImageUrl}
              alt={productDetails?.productName || "Product Image"}
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
              {productDetails?.price
                ? `$${productDetails.price}`
                : "Price Unavailable"}
            </p>
            <div className={styles.buttonWrapper}>
              <a className={styles.shopButton} href="#">
                Shop now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BrandCarousel Section */}
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold text-center mb-8">Our Brands</h2>

        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          className="elementor-image-carousel-wrapper"
        >
          {brands.map((brand) => {
            const imageId = brandImages[brand];

            // Only render a SwiperSlide if the brand has an associated imageId
            return imageId ? (
              <SwiperSlide key={brand}>
                <div className="swiper-slide-inner flex justify-center">
                  <BrandImage brand={brand} imageId={imageId} />
                </div>
              </SwiperSlide>
            ) : null; // If no imageId, skip rendering the slide
          })}
        </Swiper>

        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
}
