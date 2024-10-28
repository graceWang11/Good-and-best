/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from "../../../../convex/_generated/api";
import { ShoppingCart, Heart, ChevronLeft, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import ReviewForm from '../ReviewForm';
import { Id } from '../../../../convex/_generated/dataModel';
import { useCart } from "../CartContext";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CartSidebar from '../Cartsidebar';

export default function AccessoriesDetail({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { addToCart } = useCart();

  const productData = useQuery(api.Product.getProductById, { productId });

  // Only fetch the image URL if the storageID exists
  const imageUrl = useQuery(api.imageStorage.getImageUrl, {
    imageId: productData?.images?.[0]?.storageID ?? ""
  });

  const reviews = useQuery(api.Review.getReviewsByProductId, {
    productId: productId as Id<"products">,
  });

  // Calculate average rating and total number of reviews
  const totalReviews = reviews?.length ?? 0;
  const totalRating = reviews?.reduce((sum, review) => sum + review.rating, 0) ?? 0;
  const averageRating = totalReviews > 0 ? (totalRating / totalReviews) : null;

  if (!productData) {
    return <div className="container mx-auto px-4 py-8">Loading product details...</div>;
  }

  const { productName, price, categoryName, series } = productData;

  const handleAddToCart = () => {
    addToCart({
      productId,
      productName,
      price,
      quantity,
      imageId: productData.images?.[0]?.storageID ?? "",
    });

    setIsCartOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <Link href="/Accessories/" passHref>
          <Button variant="outline" className="flex items-center">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Accessories
          </Button>
        </Link>
      </header>
  
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={productName}
              className="w-full h-auto rounded-lg shadow-lg"
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
            <div className="flex items-center space-x-2">
              <h1 className="text-xl text-gray-600">{categoryName}</h1>
              {/* Display average rating stars here */}
              {averageRating !== null && (
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(averageRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-gray-600">
                    {averageRating.toFixed(2)} ({totalReviews}{' '}
                    {totalReviews === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}
            </div>
          </div>
          <p className="text-3xl font-semibold">${price}</p>
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20"
            />
            <Button className="flex items-center space-x-2" onClick={handleAddToCart}>
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
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
              <ReviewForm 
                productName={productName} 
                productId={productId} 
              />
              {/* Display reviews here if needed */}
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