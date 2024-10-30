/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Search, ShoppingCart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useCart } from "../CartContext";
import CartSidebar from "../Cartsidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import LoadingSkeleton from "../LoadingSkeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ImageComponent = ({ imageId, productName }: { imageId: string, productName: string }) => {
  const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId });
  
  if (!imageUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        No image available
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={productName}
      className="w-full h-full object-cover"
    />
  );
};

const ShopRackets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 400]); // Adjusted for racket prices
  const [sortBy, setSortBy] = useState("popularity");
  
  const rackets = useQuery(api.Product.getRacketProducts);
  const { addToCart } = useCart();

  if (!rackets) {
    return <LoadingSkeleton />;
  }

  // Filter rackets by search query and price range
  const filteredRackets = rackets.filter((racket) =>
    racket.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    racket.price >= priceRange[0] &&
    racket.price <= priceRange[1]
  );

  // Sort filtered rackets based on sortBy state
  const sortedRackets = [...filteredRackets].sort((a, b) => {
    if (sortBy === "price-low-to-high") return a.price - b.price;
    if (sortBy === "price-high-to-low") return b.price - a.price;
    return 0; // Default to original order (popularity)
  });

  const handleAddToCart = (racket: any) => {
    const imageId = racket.images[0]?.storageID || "";
    addToCart({
      productId: racket._id,
      productName: racket.productName,
      price: racket.price,
      imageId: imageId,
      quantity: 1,
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Badminton Rackets</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters */}
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
                    max={400}
                    step={10}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>¥{priceRange[0]}</span>
                    <span>¥{priceRange[1]}</span>
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

          {/* Products */}
          <div className="md:col-span-3 space-y-6">
            {/* Search Bar */}
            <div className="flex justify-between items-center">
              <div className="relative flex-grow md:flex-grow-0 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search rackets..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>

            {/* Rackets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRackets.map((racket) => {
                const imageId = racket.images[0]?.storageID || "";

                return (
                  <Card key={racket._id} className="relative">
                    <div>
                      {/* Image and Overlay */}
                      <div className="relative w-full h-48 overflow-hidden">
                        <Link href={`/Rackets/${racket._id}`}>
                          <div className="relative">
                            {imageId ? (
                              <ImageComponent imageId={imageId} productName={racket.productName} />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                No image available
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity duration-300"></div>
                          </div>
                        </Link>
                      </div>

                      {/* Product Info */}
                      <CardContent>
                        <Link href={`/Rackets/${racket._id}`}>
                          <CardTitle className="transition-colors duration-300 group-hover:text-blue-600">
                            {racket.productName}
                          </CardTitle>
                        </Link>
                        <p className="text-gray-600 mb-2">Brand: {racket.brand}</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ¥{racket.price}
                        </p>
                      </CardContent>

                      {/* Add to Cart Button */}
                      <CardFooter>
                        <Button
                          className="w-full transition-colors duration-300 hover:bg-blue-700"
                          onClick={() => handleAddToCart(racket)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="right">
          <CartSidebar onClose={() => setIsCartOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ShopRackets;
