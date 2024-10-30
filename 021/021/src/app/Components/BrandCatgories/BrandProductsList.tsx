/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Search, ShoppingCart, Menu, ChevronLeft } from "lucide-react";
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
import Link from "next/link";
import PageNotFound from "../PageNotFound";
import { useCart } from "../CartContext";
import CartSidebar from "../Cartsidebar"; 
import LoadingSkeleton from "../LoadingSkeleton";
import { toast } from "react-toastify";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const useProductCategories = () => {
  return useQuery(api.ProductCategory.getAllCategories);
};

const BrandProductsList = ({ brand }: { brand: string }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeSelectorOpen, setIsSizeSelectorOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const data = useQuery(api.Product.getBrandProducts, { brandName: brand });
  const categories = useProductCategories();
  const shoesCategory = categories?.find((category) => {
    return category === "Shoes"; 
  });

  const { addToCart } = useCart();

  const sizes = useQuery(
    api.Product.getProductWithSizesById,
    selectedProduct ? { productId: selectedProduct.product } : "skip"
  );

  if (!data || !categories) {
    return <LoadingSkeleton />; // Create this component
  }

  const { brandProductsWithCategory, brandProductsWithImages } = Array.isArray(data)
    ? { brandProductsWithCategory: [], brandProductsWithImages: [] }
    : data;

  const filteredProducts = brandProductsWithCategory.filter(
    (product) =>
      (selectedCategory === "All Products" || product.categoryName === selectedCategory) &&
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: { 
    product: string; 
    productName: string; 
    price: number;
    categoryName: string; // Make sure this is included in your product type
  }) => {
    // Check if the product is a shoe
    if (product.categoryName === "Shoes") {
      setSelectedProduct(product);
      setIsSizeSelectorOpen(true);
      return;
    }

    // Find the image ID
    const imageRecord = brandProductsWithImages.find(
      (image) => image.productId === product.product
    );
    const imageId = imageRecord ? imageRecord.storageID : "";

    addToCart({
      productId: product.product,
      productName: product.productName,
      price: product.price,
      imageId: imageId || '',
      quantity: 1,
    });

    setIsCartOpen(true);
  };

  const handleAddShoeWithSize = () => {
    if (!selectedProduct || !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const imageRecord = brandProductsWithImages.find(
      (image) => image.productId === selectedProduct.product
    );
    const imageId = imageRecord ? imageRecord.storageID : "";

    addToCart({
      productId: selectedProduct.product,
      productName: selectedProduct.productName,
      price: selectedProduct.price,
      imageId: imageId || '',
      quantity: 1,
      size: selectedSize,
    });

    setSelectedSize("");
    setSelectedProduct(null);
    setIsSizeSelectorOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center w-full md:w-auto justify-between">
          <Link href="/" passHref>
            <Button variant="outline" className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Main Page
            </Button>
          </Link>
          <h1 className="text-2xl font-bold md:hidden">{brand} Catalog</h1>
        </div>
        <h1 className="text-2xl font-bold hidden md:block">{brand} Product Catalog</h1>
        <div className="flex items-center w-full md:w-auto space-x-4">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button size="icon" variant="outline" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Categories Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden mb-4">
              <Menu className="h-4 w-4 mr-2" />
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

        {/* Desktop Categories */}
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

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          <>
            <h2 className="text-xl font-semibold mb-4">{selectedCategory}</h2>
            
            {/* Add alert message when no products are found */}
            {filteredProducts.length === 0 && (
              <div className="rounded-md bg-yellow-50 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      No products found
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        There are no products available for {selectedCategory} in {brand}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const imageRecord = brandProductsWithImages.find(
                  (image) => image.productId === product.product
                );
                const imageId = imageRecord ? imageRecord.storageID : null;
                const isShoeProduct = product.categoryName === "Shoes";

                return (
                  <div
                    key={product.product}
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Product Image */}
                    <div className="w-full h-48 bg-gray-100">
                      <Link href={`/Brands/${brand}/${product.product}`}>
                        {imageId ? (
                          <ImageFetcher imageId={imageId} productName={product.productName} />
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            No image available
                          </div>
                        )}
                      </Link>
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <Link href={`/Brands/${brand}/${product.product}`}>
                        <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
                          {product.productName}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-2">{product.categoryName}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">¥{product.price}</span>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent any unintended propagation
                            handleAddToCart(product);
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        </div>
      </div>

      {/* Size Selector Sidebar */}
      <Sheet open={isSizeSelectorOpen} onOpenChange={setIsSizeSelectorOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Select Size</SheetTitle>
            <SheetDescription>
              Please select your size to continue
            </SheetDescription>
          </SheetHeader>

          {selectedProduct && (
            <div className="mt-6">
              <div className="flex items-center gap-4 mb-6">
                {/* Product Image and Details */}
                <div className="w-20 h-20">
                  {brandProductsWithImages.find(
                    (image) => image.productId === selectedProduct.product
                  )?.storageID && (
                    <ImageFetcher
                      imageId={
                        brandProductsWithImages.find(
                          (image) => image.productId === selectedProduct.product
                        )?.storageID || ""
                      }
                      productName={selectedProduct.productName}
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedProduct.productName}</h3>
                  <p className="text-sm text-gray-500">¥{selectedProduct.price}</p>
                </div>
              </div>

              <Tabs defaultValue="cm" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="cm">cm</TabsTrigger>
                  <TabsTrigger value="us-men">US(Men)</TabsTrigger>
                  <TabsTrigger value="us-women">US(Women)</TabsTrigger>
                  <TabsTrigger value="uk">UK</TabsTrigger>
                </TabsList>

                {["cm", "us-men", "us-women", "uk"].map((region) => {
                  const regionMap = {
                    "cm": "cm",
                    "us-men": "US(Men)",
                    "us-women": "US(Women)",
                    "uk": "UK"
                  };
                  
                  return (
                    <TabsContent key={region} value={region} className="mt-4">
                      <div className="grid grid-cols-4 gap-2">
                        {sizes?.sizes
                          ?.filter(size => size.SizeRegion === regionMap[region as keyof typeof regionMap])
                          .map((size) => (
                            <Button
                              key={size.SizeValue}
                              variant={selectedSize === size.SizeValue ? "secondary" : "outline"}
                              className="w-full"
                              onClick={() => setSelectedSize(size.SizeValue)}
                            >
                              {size.SizeValue}
                            </Button>
                          ))}
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>

              <div className="mt-6">
                <Button
                  className="w-full"
                  onClick={handleAddShoeWithSize}
                  disabled={!selectedSize}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Existing Cart Sidebar */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="right">
          <CartSidebar onClose={() => setIsCartOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

// ImageFetcher Component
const ImageFetcher = ({ imageId, productName }: { imageId: string; productName: string }) => {
  const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId });

  if (!imageUrl) {
    return <div className="w-full h-full bg-gray-200" />;
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
