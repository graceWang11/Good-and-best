/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from "../../../../convex/_generated/api"
import { ShoppingCart, Heart, ChevronLeft, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function ProductPage({ productId, brand }: { productId: string, brand: string}) {
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false)
  const productData = useQuery(api.Product.getProductById, { productId })
  const imageUrl = useQuery(api.imageStorage.getImageUrl, {
    imageId: productData?.images?.[0]?.storageID ?? ""
  })

  if (!productData) {
    return <div className="container mx-auto px-4 py-8">Loading product details...</div>
  }

  const { productName, price, categoryName, series } = productData

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle review submission logic here
    console.log('Review submitted')
  }

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
            <h1 className="text-xl text-gray-600">{categoryName}</h1>
          </div>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            ))}
            <span className="text-gray-600">(No reviews yet)</span>
          </div>
          <p className="text-3xl font-semibold">¥{price}</p>
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20"
            />
            <Button className="flex items-center space-x-2">
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
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Be the first to review "{productName}"</h2>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Your email address will not be published. Required fields are marked <span className="text-red-500">*</span>
                  </p>
                  
                  <div>
                    <Label htmlFor="rating" className="block mb-2">Your rating <span className="text-red-500">*</span></Label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          type="button"
                          className="focus:outline-none"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        >
                          <Star 
                            className={`w-6 h-6 ${
                              star <= (hoverRating || rating) 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                            } transition-colors duration-150`} 
                          />
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="review" className="block mb-2">Your review <span className="text-red-500">*</span></Label>
                    <Textarea id="review" required rows={5} />
                  </div>

                  <div>
                    <Label htmlFor="name" className="block mb-2">Name <span className="text-red-500">*</span></Label>
                    <Input id="name" required />
                  </div>

                  <div>
                    <Label htmlFor="email" className="block mb-2">Email <span className="text-red-500">*</span></Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="save-info" />
                    <Label htmlFor="save-info" className="text-sm">
                      Save my name, email, and website in this browser for the next time I comment.
                    </Label>
                  </div>

                  <Button type="submit" className="w-full">Submit</Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}