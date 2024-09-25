/* eslint-disable @next/next/no-img-element */
"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from 'react';
import { ShoppingCart, Search, Menu, ChevronLeft, Filter, Star } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger
} from "@/components/ui/sheet";

// Helper Component to fetch and display image
const ImageFetcher = ({ imageId, productName }: { imageId: string; productName: string }) => {
  const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId });

  if (!imageUrl) {
    return <div>Loading image...</div>;
  }

  return (
    <img
      src={imageUrl}
      alt={productName}
      className="w-full h-full object-cover"
      onError={(e) => {
        e.currentTarget.src = "/path/to/fallback-image.jpg"; // Fallback image
      }}
    />
  );
};




export default function ShopAccessories() {
  const [selectedCategory, setSelectedCategory] = useState("All Accessories");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortBy, setSortBy] = useState("popularity");

  // Fetch accessories using `useQuery`
  const accessories = useQuery(api.Product.getAccessories);

  if (!accessories) {
    return <div>Loading accessories...</div>; // Handle loading state
  }

  // Fetch associated images for each accessory (similar to BrandProductsList)
  const accessoriesWithImages = accessories.map((accessory) => {
    const imageRecord = accessory.images?.[0]?.storageID || null;
    return { ...accessory, imageId: imageRecord };
  });

  // Filter accessories by search query and price range
  const filteredAccessories = accessoriesWithImages.filter(
    (item) =>
      item.price >= priceRange[0] &&
      item.price <= priceRange[1] &&
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort filtered accessories based on sortBy state
  const sortedAccessories = [...filteredAccessories].sort((a, b) => {
    if (sortBy === "price-low-to-high") return a.price - b.price;
    if (sortBy === "price-high-to-low") return b.price - a.price;
    return 0; // Default to original order (popularity)
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Badminton Accessories</h1>
          <Link href="/" passHref>
            <Button variant="outline" className="flex items-center">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Main Page
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Price Range</label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select sorting option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
                      <SelectItem value="price-high-to-low">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <Input
                type="search"
                placeholder="Search accessories..."
                className="max-w-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAccessories.map((item) => (
          <Link href={`/Accessories/${item._id}`} key={item._id} passHref>
            <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105">
              <CardHeader>
                <div className="relative w-full h-48 overflow-hidden">
                  {item.imageId && <ImageFetcher imageId={item.imageId} productName={item.productName} />}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity duration-300"></div>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="transition-colors duration-300 group-hover:text-blue-600">{item.productName}</CardTitle>
                <p className="text-2xl font-bold text-gray-900">${item.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full transition-colors duration-300 hover:bg-blue-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}