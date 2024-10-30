/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from "../../../../convex/_generated/api";
import { ShoppingCart, Heart, ChevronLeft, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import ReviewForm from "../ReviewForm";
import { Id } from '../../../../convex/_generated/dataModel';
import { useCart } from "../CartContext";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CartSidebar from "../Cartsidebar";
import LoadingSkeleton from '../LoadingSkeleton';

export default function ProductDetail({ productId, brand }: { productId: string; brand: string }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { addToCart } = useCart();

  const productWithSizes = useQuery(api.Product.getProductWithSizesById, { productId });
  const productData = useQuery(api.Product.getProductById, { productId });
  const imageUrl = useQuery(api.imageStorage.getImageUrl, {
    imageId: productData?.images?.[0]?.storageID ?? ""
  });

  const reviews = useQuery(api.Review.getReviewsByProductId, {
    productId: productId as Id<"products">,
  });

  if (!productData || !productWithSizes) {
    return <LoadingSkeleton />;
  }

  const productName = productData.productName;
  const price = productData.price;
  const series = productData.series;
  const totalReviews = reviews?.length ?? 0;
  const totalRating = reviews?.reduce((sum, review) => sum + review.rating, 0) ?? 0;
  const averageRating = totalReviews > 0 ? (totalRating / totalReviews) : null;

  const sizesByRegion: { [key: string]: Set<string> } = {};
  if (productWithSizes.sizes && productWithSizes.sizes.length) {
    productWithSizes.sizes.forEach((sizeObj: any) => {
      if (!sizesByRegion[sizeObj.SizeRegion]) {
        sizesByRegion[sizeObj.SizeRegion] = new Set();
      }
      sizesByRegion[sizeObj.SizeRegion].add(sizeObj.SizeValue);
    });
  }

  const handleAddToCart = () => {
    // Check if the product is a shoe and if a size has been selected
    if (productData.categoryName === "Shoes" && !selectedSize) {
      alert("Please select a size.");
      return;
    }
  
    // Prepare the cart item
    const cartItem = {
      productId,
      productName,
      price,
      imageUrl: imageUrl || "",
      quantity,
    };
  
    // Include size and imageId for all products
    const updatedCartItem = {
      ...cartItem,
      imageId: productData.images?.[0]?.storageID ?? "",
      size: productData.categoryName === "Shoes" ? selectedSize : undefined
    };
    addToCart(updatedCartItem);
    setIsCartOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <Link href={`/Brands/${brand}`} passHref>
          <Button variant="outline" className="flex items-center">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to {brand} Products
          </Button>
        </Link>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-w-1 aspect-h-1">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={productName}
              className="object-cover rounded-lg"
            />
          ) : (
            <div className="bg-gray-200 rounded-lg h-full"></div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{productName}</h1>
          {productData.categoryName == "Shoes" && (
            <div className="my-4">
            <h2 className="text-lg font-semibold mb-2">Select Size</h2>
            <Tabs defaultValue={Object.keys(sizesByRegion)[0]}>
              <TabsList>
                {Object.keys(sizesByRegion).map((region) => (
                  <TabsTrigger key={region} value={region}>
                    {region}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(sizesByRegion).map(([region, sizesSet]) => (
                <TabsContent key={region} value={region}>
                  <RadioGroup
                    value={selectedSize}
                    onValueChange={(value) => setSelectedSize(value)}
                    className="grid grid-cols-4 gap-4"
                  >
                    {Array.from(sizesSet as Set<string>).map((size: string) => (
                      <div key={`${region}-${size}`}>
                        <RadioGroupItem
                          value={size}
                          id={`${region}-${size}`}
                          className="peer sr-only"  // The radio button itself is visually hidden
                        />
                        <Label
                          htmlFor={`${region}-${size}`}
                          className={`flex flex-col items-center justify-center rounded-md border-2 border-muted p-4 cursor-pointer
                            ${selectedSize === size ? 'border-primary bg-accent text-accent-foreground' : 'bg-popover'}
                            hover:bg-accent hover:text-accent-foreground peer-checked:border-primary peer-checked:bg-accent peer-checked:text-accent-foreground`}
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
          )}{
            <p className="text-gray-600 mb-4">{productData.categoryName || "Not specified"}</p>
          }
          {averageRating !== null && (
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    averageRating >= index + 1
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-gray-600 ml-2">
                {averageRating.toFixed(2)} ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

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
