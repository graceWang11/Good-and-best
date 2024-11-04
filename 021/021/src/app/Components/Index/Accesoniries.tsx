/* eslint-disable react/no-unescaped-entities */
"use client";

import { useQuery } from "convex/react"; 
import { api } from "../../../../convex/_generated/api"; 
import { Button } from "@/components/ui/button"; 
import Image from "next/image"; 
import Link from "next/link";
import LoadingSkeleton from "@/app/Components/LoadingSkeleton";

const ShopBadmintonAccessories = () => {
  // Fetch the background image from API
  const bgUrl = useQuery(api.imageStorage.getImageUrl, {
    imageId: "kg291k5jjwn6p1w8pvj5fgjazs73zwfk",
  });

  if (!bgUrl) {
    return <LoadingSkeleton />;
  }

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-12 px-4 text-white min-h-[500px]"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Shop Badminton Accessories</h2>
        <p className="text-lg mb-6">
          At Good and Best, choose freely any accessory you desire
        </p>

        <div className="flex justify-center mt-6">
          <Link href="/Accessories">
            <Button variant="default" className="bg-blue-500 text-white hover:scale-105 hover:shadow-lg transition-transform">
              Shop Accessories
            </Button>
          </Link>
        </div>
      </div>

      {/* Accessory Image */}
      <div className="relative z-10 max-w-lg mx-auto mt-8">
        <div className="relative w-[634px] h-[634px]">
          <Image
            src={bgUrl}
            alt="Badminton Accessories"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default ShopBadmintonAccessories;
