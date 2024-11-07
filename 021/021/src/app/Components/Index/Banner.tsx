"use client";

import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import BrandImage from "../Index/BrandImage";
import Link from "next/link";
import LoadingSkeleton from "../LoadingSkeleton";
import leftImageUrl from '../../../assets/BannerImages/X Crayon ShinChan A39CS.png';
import Li_Ning from '../../../assets/BannerImages/Li-Ning-logo.png';
import kawasaki from '../../../assets/BannerImages/kawasaki.png';
import Yonex from '../../../assets/BannerImages/Yonex.png';
import victor from '../../../assets/BannerImages/VICTOR_logo.png'

// Define brand images mapping
const brandImagesMap: { [key: string]: any } = {
  Victor: victor,
  Yonex: Yonex,
  "Li-Ning": Li_Ning,
  Kawasaki: kawasaki,
};

export default function BannerWithCarousel() {
  const [brands, setBrands] = useState<string[]>([]);
  const products = useQuery(api.Product.getAll);
  const router = useRouter();

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
    imageId: "kg209f5q7js97r80kbvnfd7j0x73z6yr",
  });



  const productDetails = useQuery(api.Product.getProductDetailsByImageId, {
    imageId: "kg2ear7kg4mpspvb00qycgqnjx73z92f",
  });

  // Error handling and loading
  if (!products) {
    return <LoadingSkeleton />;
  }

  if (!backgroundImageUrl) {
    return <LoadingSkeleton />;
  }



  if (!productDetails) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Banner Section */}
      <div
        className="relative w-full min-h-[60vh] md:min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      >
        {/* Desktop Product Details Overlay (hidden on mobile) */}
        <div className="hidden md:flex absolute inset-y-0 left-0 flex-col justify-center items-start text-white p-8">
          <div className="mb-4">
            <Image
              src={leftImageUrl}
              alt={productDetails?.productName || "Product Image"}
              className="w-[200px] h-[200px] rounded-lg shadow-lg object-cover"
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
              ¥{productDetails?.price?.toLocaleString() || "Price Unavailable"}
            </p>
            <Link href={`/Brands/${productDetails.brand}/${productDetails._id}`}>
              <button className="mt-4 bg-blue-500 px-4 py-2 text-white rounded-lg hover:scale-105 transition-transform">
                Shop now
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Product Details Overlay */}
        <div className="md:hidden absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-4">
          <div className="w-full max-w-xs flex flex-col items-center space-y-4">
            <div className="w-48 h-48 relative">
              <Image
                src={leftImageUrl}
                alt={productDetails?.productName || "Product Image"}
                fill
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold">
                {productDetails?.productName || "Unknown Product"}
              </h2>
              <p className="mt-2 text-lg">
                {productDetails?.brand || "Unknown Brand"}
              </p>
              <p className="mt-2">
                ¥{productDetails?.price?.toLocaleString() || "Price Unavailable"}
              </p>
              <Link href={`/Brands/${productDetails.brand}/${productDetails._id}`}>
                <button className="mt-4 bg-blue-500 px-6 py-2 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition-all w-full">
                  Shop now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Section */}
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Our Brands</h2>

        {/* Desktop Brands Display (hidden on mobile) */}
        <div className="hidden md:block">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            className="brand-carousel"
          >
            {brands.map((brand) => {
              const brandImage = brandImagesMap[brand];
              return brandImage ? (
                <SwiperSlide key={brand}>
                  <div
                    onClick={() => handleCardClick(brand)}
                    className="block w-full h-full cursor-pointer"
                  >
                    <Card className="aspect-square w-full max-w-[300px] mx-auto flex justify-center items-center hover:scale-105 hover:shadow-lg transition-transform">
                      <CardContent className="p-4 w-full h-full">
                        <div className="w-full h-full relative">
                          <Image
                            src={brandImage}
                            alt={`${brand} logo`}
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </SwiperSlide>
              ) : null; // If no imageId, skip rendering the slide
            })}
          </Swiper>
        </div>

        {/* Mobile Brands Display */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            className="brand-carousel-mobile"
          >
            {brands.map((brand) => {
              const brandImage = brandImagesMap[brand];
              return brandImage ? (
                <SwiperSlide key={brand}>
                  <div
                    onClick={() => handleCardClick(brand)}
                    className="block cursor-pointer px-2"
                  >
                    <Card className="aspect-square flex justify-center items-center hover:shadow-lg transition-all">
                      <CardContent className="flex justify-center items-center p-4">
                        <div className="w-full h-full relative">
                          <Image
                            src={brandImage}
                            alt={`${brand} logo`}
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 768px) 100vw"
                            priority
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </SwiperSlide>
              ) : null;
            })}
          </Swiper>
        </div>
      </div>

      {/* Swiper Styles */}
      <style jsx global>{`
        .brand-carousel .swiper-pagination-bullet,
        .brand-carousel-mobile .swiper-pagination-bullet {
          background: #666;
          opacity: 0.5;
        }
        .brand-carousel .swiper-pagination-bullet-active,
        .brand-carousel-mobile .swiper-pagination-bullet-active {
          background: #000;
          opacity: 1;
        }
        .brand-carousel-mobile .swiper-slide {
          transition: transform 0.3s;
        }
        .brand-carousel-mobile .swiper-slide-active {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
