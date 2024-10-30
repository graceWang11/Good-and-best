"use client";  // Ensure this is a client-side component

import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from 'next/navigation'; 
import BrandImage from "../Index/BrandImage";
import Link from "next/link";
import LoadingSkeleton from "../LoadingSkeleton";


// Map brand names to their respective image IDs
const brandImages: { [key: string]: string } = {
  Victor: "kg2f8ejqxpqbw7q2q86yxr8btd70rk4e",
  Yonex: "kg296tr2mg8j2vwvnyhb638a7d70tcfw",
  "Li-Ning": "kg29b486jhyebew0r40jbkr7kh70sbz8",
  Kawasaki: "kg24jtgpb1h03bytra51y14zw570sxhw",
};

export default function BannerWithCarousel() {
  const [brands, setBrands] = useState<string[]>([]);
  const products = useQuery(api.Product.getAll);
  const router = useRouter() ;

  useEffect(() => {
    if (products) {
      const uniqueBrands = Array.from(
        new Set(products.map((product: any) => product.brand))
      );
      setBrands(uniqueBrands);
    }
  }, [products]);

  // Function to handle card click and navigate to the brand page
  const handleCardClick = (brand: string) => {
    router.push(`/Brands/${encodeURIComponent(brand)}`);
  };

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
    return <LoadingSkeleton />;
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Banner Section */}
      <div
        className="relative w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      >
        {/* Product Details Overlay moved to the left */}
        <div className="absolute inset-y-0 left-0 flex flex-col justify-center items-start text-white p-8 ">
          {/* Product Image */}
          <div className="mb-4">
            <Image
              src={leftImageUrl}
              alt={productDetails?.productName || "Product Image"}
              width={200}
              height={200}
              className="rounded-lg shadow-lg"
            />
          </div>
          {/* Product Details */}
          <div>
            <h2 className="text-3xl font-bold">
              {productDetails?.productName || "Unknown Product"}
            </h2>
            <p className="mt-2 text-xl">
              {productDetails?.brand || "Unknown Brand"}
            </p>
            <p className="mt-2 text-lg">
              {productDetails?.price
                ? `$${productDetails.price}`
                : "Price Unavailable"}
            </p>
            <Link href={`/Brands/${productDetails.brand}/${productDetails._id}`}>
            <button className="mt-4 bg-blue-500 px-4 py-2 text-white rounded-lg hover:scale-105 transition-transform">
              Shop now
            </button>
            </Link>
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
                {/* Make each card clickable */}
                <div
                  onClick={() => handleCardClick(brand)}  // Handle the click to navigate
                  className="block w-full h-full cursor-pointer"
                >
                  {/* Set consistent card size and hover effect */}
                  <Card className="w-64 h-64 flex justify-center items-center hover:scale-105 hover:shadow-lg transition-transform">
                    <CardContent className="flex justify-center items-center">
                      {/* Wrap the BrandImage in a div that accepts className */}
                      <div className="flex justify-center items-center w-full h-full">
                        <BrandImage brand={brand} imageId={imageId} />
                      </div>
                    </CardContent>
                  </Card>
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
