"use client";

import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

// Map brand names to their respective image IDs
const brandImageIds: { [key: string]: string } = {
  Victor: "kg2f8ejqxpqbw7q2q86yxr8btd70rk4e",
  Yonex: "kg26dy1qhfd2saj9qr60r6ydk570rtj0",
  "Li-Ning": "kg29b486jhyebew0r40jbkr7kh70sbz8",
  Kawasaki: "kg24jtgpb1h03bytra51y14zw570sxhw",
};

export default function BrandCarousel() {
  const [brands, setBrands] = useState<string[]>([]);
  const imageUrls: { [key: string]: string | undefined } = {};

  // Fetch products from the API and filter out unique brands
  const products = useQuery(api.Product.getAll);

  // Use useQuery to fetch image URLs for each brand
  Object.keys(brandImageIds).forEach((brand) => {
    imageUrls[brand] = useQuery(api.imageStorage.getImageUrl, { imageId: brandImageIds[brand] });
  });

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
        {brands.map((brand) => (
          <SwiperSlide key={brand}>
            <div className="swiper-slide-inner flex justify-center">
              {imageUrls[brand] && (
                <Image
                  src={imageUrls[brand]}  // Use the fetched image URL for the brand
                  alt={brand}
                  width={150}
                  height={100}
                  className="swiper-slide-image"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-pagination"></div>
    </div>
  );
}
