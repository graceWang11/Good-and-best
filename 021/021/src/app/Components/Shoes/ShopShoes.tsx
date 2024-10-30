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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import LoadingSkeleton from "../LoadingSkeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-toastify";

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

const ShopShoes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 300]); // Adjusted for shoe prices
  const [sortBy, setSortBy] = useState("popularity");
  const [isSizeSelectorOpen, setIsSizeSelectorOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  
  const shoes = useQuery(api.Product.getShoesProducts);
  const { addToCart } = useCart();

  const sizes = useQuery(
    api.Product.getProductWithSizesById,
    selectedProduct ? { productId: selectedProduct._id } : "skip"
  );

  if (!shoes) {
    return <LoadingSkeleton />;
  }

  // Filter shoes by search query and price range
  const filteredShoes = shoes.filter((shoe) =>
    shoe.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    shoe.price >= priceRange[0] &&
    shoe.price <= priceRange[1]
  );

  // Sort filtered shoes based on sortBy state
  const sortedShoes = [...filteredShoes].sort((a, b) => {
    if (sortBy === "price-low-to-high") return a.price - b.price;
    if (sortBy === "price-high-to-low") return b.price - a.price;
    return 0; // Default to original order (popularity)
  });

  const handleAddToCart = (shoe: any) => {
    setSelectedProduct(shoe);
    setIsSizeSelectorOpen(true);
  };

  const handleAddShoeWithSize = () => {
    if (!selectedProduct || !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const imageId = selectedProduct.images[0]?.storageID || "";

    addToCart({
      productId: selectedProduct._id,
      productName: selectedProduct.productName,
      price: selectedProduct.price,
      imageId: imageId,
      quantity: 1,
      size: selectedSize,
    });

    setSelectedSize("");
    setSelectedProduct(null);
    setIsSizeSelectorOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Badminton Shoes</h1>
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
                    max={300}
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
                  placeholder="Search shoes..."
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

            {/* Shoes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedShoes.map((shoe) => {
                const imageId = shoe.images[0]?.storageID || "";

                return (
                  <Card key={shoe._id} className="relative">
                    <div>
                      {/* Image and Overlay */}
                      <div className="relative w-full h-48 overflow-hidden">
                        <Link href={`/Shoes/${shoe._id}`}>
                          <div className="relative">
                            {imageId ? (
                              <ImageComponent imageId={imageId} productName={shoe.productName} />
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
                        <Link href={`/Shoes/${shoe._id}`}>
                          <CardTitle className="transition-colors duration-300 group-hover:text-blue-600">
                            {shoe.productName}
                          </CardTitle>
                        </Link>
                        <p className="text-gray-600 mb-2">Brand: {shoe.brand}</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ¥{shoe.price}
                        </p>
                      </CardContent>

                      {/* Add to Cart Button */}
                      <CardFooter>
                        <Button
                          className="w-full transition-colors duration-300 hover:bg-blue-700"
                          onClick={() => handleAddToCart(shoe)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Select Size & Add to Cart
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

      {/* Size Selector Sheet */}
      <Sheet open={isSizeSelectorOpen} onOpenChange={setIsSizeSelectorOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Select Size</SheetTitle>
          </SheetHeader>

          {selectedProduct && (
            <div className="mt-6">
              <div className="flex items-center gap-4 mb-6">
                {/* Product Image and Details */}
                <div className="w-20 h-20">
                  {selectedProduct.images[0]?.storageID && (
                    <ImageComponent
                      imageId={selectedProduct.images[0].storageID}
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

      {/* Cart Sidebar */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="right">
          <CartSidebar onClose={() => setIsCartOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ShopShoes;
