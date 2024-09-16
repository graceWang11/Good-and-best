"use client";

import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";  // Adjust based on your project structure
import { useQuery } from "convex/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import BrandImage from './BrandImage';  // Import the BrandImage component

// Map brand names to their respective image IDs
const brandImages: { [key: string]: string } = {
  Victor: "kg2f8ejqxpqbw7q2q86yxr8btd70rk4e",
  Yonex: "kg296tr2mg8j2vwvnyhb638a7d70tcfw",
  "Li-Ning": "kg29b486jhyebew0r40jbkr7kh70sbz8",
  Kawasaki: "kg24jtgpb1h03bytra51y14zw570sxhw",
};

export default function BrandCarousel() {
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

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
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
  );
}
