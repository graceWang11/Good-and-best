/* eslint-disable react/no-unescaped-entities */
"use client";

import { useQuery } from "convex/react"; // Assuming you're using convex for fetching images
import { api } from "../../../convex/_generated/api"; // Adjust path as per your project
import { Button } from "@/components/ui/button"; // Adjust the import path based on your Shadcn Button component's location
import Image from "next/image"; // If you want to use Image optimization from Next.js

const ShopBadmintonAccessories = () => {
  // Fetch the background image from API
  const bgUrl = useQuery(api.imageStorage.getImageUrl, {
    imageId: "kg260m14ak58c8j68zx513dnn970wpaq", // Use the provided image ID
  });

  // Return loading state if image isn't available yet
  if (!bgUrl) {
    return <div>Loading...</div>;
  }

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-12 px-4 text-white"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Shop Badminton Accessories</h2>
        <p className="text-lg mb-6">
        At Good and Best, choose freely any accessory you desire
        </p>

        {/* Shadcn Button */}
        <div className="flex justify-center mt-6">
          <Button variant="default" className="bg-blue-500 text-white">
            Shop Accessories
          </Button>
        </div>
      </div>

      {/* Scooter Accessory Image */}
      <div className="relative z-10 max-w-lg mx-auto mt-8">
        <Image
          src={bgUrl}
          alt="Scooter Accessory"
          width={634}
          height={634}
          className="mx-auto"
        />
      </div>
    </section>
  );
};

export default ShopBadmintonAccessories;
