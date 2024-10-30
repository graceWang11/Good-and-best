/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ShoppingCart, Heart, ChevronLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import ReviewForm from "../ReviewForm";
import { Id } from "../../../../convex/_generated/dataModel";
import { useCart } from "../CartContext";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CartSidebar from "../Cartsidebar";
import { toast } from "react-toastify";

// Separate component for image handling
const ProductImage = ({ storageId, productName }: { storageId: string, productName: string }) => {
  const imageUrl = useQuery(api.imageStorage.getImageUrl, {
    imageId: storageId,
  });

  if (!imageUrl) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        No image available
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={productName}
      className="w-full h-auto rounded-lg shadow-lg"
    />
  );
};

export default function ShoesDetail({ productId }: { productId: string }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const { addToCart } = useCart();

  const productData = useQuery(api.Product.getProductById, { productId });
  const sizes = useQuery(api.Product.getProductWithSizesById, { productId });

  const reviews = useQuery(api.Review.getReviewsByProductId, {
    productId: productId as Id<"products">,
  });

  // Calculate average rating and total number of reviews
  const totalReviews = reviews?.length ?? 0;
  const totalRating = reviews?.reduce((sum, review) => sum + review.rating, 0) ?? 0;
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : null;

  if (!productData || !sizes) {
    return <div className="container mx-auto px-4 py-8">Loading product details...</div>;
  }

  const { productName, price, brand, series, images } = productData;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart({
      productId,
      productName,
      price,
      quantity: 1,
      imageId: images?.[0]?.storageID ?? "",
      size: selectedSize,
    });

    setIsCartOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <Link href="/Shoes" passHref>
          <Button variant="outline" className="flex items-center">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Shoes
          </Button>
        </Link>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          {images?.[0]?.storageID ? (
            <ProductImage 
              storageId={images[0].storageID} 
              productName={productName} 
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              No image available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <h2 className="text-3xl font-bold">{productName}</h2>
            <p className="text-xl text-gray-600">{brand}</p>
            {averageRating !== null && (
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-gray-600">
                  {averageRating.toFixed(2)} ({totalReviews}{" "}
                  {totalReviews === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}
          </div>
          <p className="text-3xl font-semibold">¥{price}</p>

          {/* Size Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold">Select Size</h3>
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
          </div>

          <div className="flex items-center space-x-4">
            <Button
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="w-5 h-5" />
              <span className="sr-only">Add to Wishlist</span>
            </Button>
          </div>

          <Tabs defaultValue="description" className="mt-8">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p>Series: {series || "Not specified"}</p>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <ReviewForm productName={productName} productId={productId} />
            </TabsContent>
          </Tabs>
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
}
