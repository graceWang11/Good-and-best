/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Search, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Function to fetch product categories dynamically from the database
const useProductCategories = () => {
  return useQuery(api.ProductCategory.getAllCategories);
};

const BrandProductsList = ({ brand }: { brand: string }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  // Fetch brand products data
  const data = useQuery(api.Product.getBrandProducts, { brandName: brand });
  const categories = useProductCategories();  // Use the new category query here

  if (!data || !categories) {
    return <div>Loading products or categories...</div>;
  }

  const { brandProductsWithCategory, brandProductsWithImages } = Array.isArray(data) ? { brandProductsWithCategory: [], brandProductsWithImages: [] } : data;

  // Filtered products based on the selected category
  const filteredProducts = selectedCategory === "All Products"
    ? brandProductsWithCategory
    : brandProductsWithCategory.filter(product => product.categoryName === selectedCategory);

  if (filteredProducts.length === 0) {
    return <div>No products found for {brand}.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section with search and shopping cart */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{brand} Product Catalog</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="search" placeholder="Search products..." className="pl-8" />
          </div>
          <Button size="icon" variant="outline">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Category Navigation for Desktop and Drawer for Mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden mb-4">
              <Search className="h-4 w-4 mr-2" />
              Categories
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Product Categories</SheetTitle>
              <SheetDescription>
                Choose a category to view related products
              </SheetDescription>
            </SheetHeader>
            <nav className="mt-4">
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory("All Products")}
                  >
                    All Products
                  </Button>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop category navigation */}
        <nav className="hidden md:block w-1/4">
          <h2 className="text-lg font-semibold mb-4">Product Categories</h2>
          <ul className="space-y-2">
            <li>
              <Button
                variant={selectedCategory === "All Products" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("All Products")}
              >
                All Products
              </Button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <Button
                  variant={selectedCategory === category ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Product Grid Layout */}
        <div className="w-full md:w-3/4">
          <h2 className="text-xl font-semibold mb-4">{selectedCategory}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const imageRecord = brandProductsWithImages.find(
                (image) => image.productId === product.product
              );
              const imageId = imageRecord ? imageRecord.storageID : null;

              return (
                <div
                  key={product.product}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-full h-48 bg-gray-100">
                    {imageId ? (
                      <ImageFetcher imageId={imageId} productName={product.productName} />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        No image available
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.productName}</h3>
                    <p className="text-gray-600 mb-2">{product.categoryName}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">¥{product.price}</span>
                      <Button size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ImageFetcher component to display product images
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
        e.currentTarget.src = "/path/to/fallback-image.jpg";
      }}
    />
  );
};

export default BrandProductsList;
