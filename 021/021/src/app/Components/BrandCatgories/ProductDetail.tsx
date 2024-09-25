/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from "../../../../convex/_generated/api"
import { ShoppingCart, Heart, ChevronLeft, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import ReviewForm from "../ReviewForm"
import { Id } from '../../../../convex/_generated/dataModel';

export default function ProductDetail({ productId, brand }: { productId: string, brand: string }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const productWithSizes = useQuery(api.Product.getProductWithSizesById, { productId });
  const productData = useQuery(api.Product.getProductById, { productId })
  const imageUrl = useQuery(api.imageStorage.getImageUrl, {
    imageId: productData?.images?.[0]?.storageID ?? ""
  })

  const reviews = useQuery(api.Review.getReviewsByProductId, {
    productId: productId as Id<"products">,
  });

  if (!productData || !productWithSizes) {
    return <div className="container mx-auto px-4 py-8">Loading product details...</div>
  }

  const totalReviews = reviews?.length ?? 0;
  const totalRating = reviews?.reduce((sum, review) => sum + review.rating, 0) ?? 0;
  const averageRating = totalReviews > 0 ? (totalRating / totalReviews) : null;

  const { productName, price, categoryName, series } = productData;

  const groupSizesByType = (sizes: any[]) => {
    return sizes.reduce((acc, size) => {
      const { SizeRegion, SizeValue } = size;
      if (!acc[SizeRegion]) {
        acc[SizeRegion] = new Set<string>();
      }
      acc[SizeRegion].add(SizeValue);
      return acc;
    }, {} as Record<string, Set<string>>);
  };

  const groupedSizes = groupSizesByType(productWithSizes.sizes || []);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <Link href={`/Brands/${encodeURIComponent(brand)}`} passHref>
          <Button variant="outline" className="flex items-center">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to {brand} Products
          </Button>
        </Link>

        <Button size="icon" variant="outline">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Cart</span>
        </Button>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
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

        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <h2 className="text-3xl font-bold">{productName}</h2>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl text-gray-600">{categoryName}</h1>
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
                    {averageRating.toFixed(2)} ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}
            </div>
          </div>

          <p className="text-3xl font-semibold">¥{price}</p>

          {/* Redesigned Size Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
            <Tabs defaultValue="CM" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="cm">CM</TabsTrigger>
                <TabsTrigger value="US(Men)">US (Men)</TabsTrigger>
                <TabsTrigger value="US(Women)">US (Women)</TabsTrigger>
                <TabsTrigger value="UK">UK</TabsTrigger>
              </TabsList>
              {Object.entries(groupedSizes).map(([region, sizesSet]) => (
                <TabsContent key={region} value={region}>
                  <RadioGroup
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4"
                  >
                    {Array.from(sizesSet as Set<string>).map((size: string) => (
                      <div key={`${region}-${size}`}>
                        <RadioGroupItem
                          value={`${region}-${size}`}
                          id={`${region}-${size}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`${region}-${size}`}
                          className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="flex items-center space-x-4">
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20"
            />
            <Button className="flex items-center space-x-2">
              <ShoppingCart className="w-5 w-5" />
              <span>Add to Cart</span>
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}