/* eslint-disable react/no-unescaped-entities */
"use client";

import { useQuery } from "convex/react"; 
import { api } from "../../../convex/_generated/api"; 
import { Button } from "@/components/ui/button";
const AboutUs = () => {
  // Fetch the image from API
  const bgUrl = useQuery(api.imageStorage.getImageUrl, {
    imageId: "kg235f0rbve62bnbxfdpyvht39702r58",
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
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Welcome to Good And Best Badminton</h2>
        <p className="text-lg mb-6">
          Your one-stop destination for all things badminton! Whether you're a seasoned player, an enthusiastic beginner, or a sports fan, we are here to equip you with the best gear and accessories to elevate your game.
        </p>
        <p className="text-lg mb-6">
          Founded in 2024, Good And Best Badminton was born out of a passion for badminton and a commitment to provide players of all levels with high-quality equipment. We offer a carefully curated selection of rackets, shoes, shuttlecocks, and accessories from trusted brands.
        </p>
        <p className="text-lg mb-6">
          At Good And Best Badminton, we believe that every player deserves the best. Our team is dedicated to providing exceptional customer service, ensuring you find exactly what you need.
        </p>
        <p className="text-lg mb-6">
          Thank you for choosing Good And Best Badminton. Let's smash your goals together!
        </p>

        {/* Shadcn Button */}
        <Button variant="default" className="bg-blue-500 text-white mt-6">
          Learn More
        </Button>
      </div>
    </section>
  );
};

export default AboutUs;
