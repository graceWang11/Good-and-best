/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from 'lucide-react';
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Id } from '../../../convex/_generated/dataModel';

export default function ReviewForm({ productName, productId }: { productName: string, productId: string }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const addReview = useMutation(api.Review.addReview);
  const { isSignedIn } = useUser();

  const reviews = useQuery(api.Review.getReviewsByProductId, { productId: productId as Id<"products"> });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!isSignedIn) {
      alert("Please sign in to submit a review.");
      return;
    }

    try {
      await addReview({
        productId: productId as Id<"products">,
        rating,
        reviewDescription: formData.get('review') as string,
      });

      console.log("Review submitted successfully");
      setRating(0);
      (event.target as HTMLFormElement).reset();
      setShowAlert(true);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="relative">
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h3 className="text-2xl font-bold mb-4">Thank you!</h3>
            <p className="text-lg mb-6">Your review has been submitted.</p>
            <Button onClick={() => setShowAlert(false)} className="w-full">
              Okay
            </Button>
          </div>
        </div>
      )}

      <div className={`bg-white p-6 rounded-lg shadow-sm ${showAlert ? 'blur-sm' : ''}`}>
        <h2 className="text-2xl font-semibold mb-4">
          Reviews for "{productName}"
        </h2>

        {reviews && reviews.length > 0 ? (
          <div className="mb-6">
            {reviews.map((review) => (
              <div key={review._id.toString()} className="mb-4">
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-yellow-400' : 'fill-gray-300'}`} />
                  ))}
                  <span className="text-gray-600">{review.userName}</span>
                </div>
                <p className="text-gray-800">{review.reviewDescription}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mb-6">No reviews yet.</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-gray-500">
            Your email address will not be published. Required fields are marked{' '}
            <span className="text-red-500">*</span>
          </p>

          <div>
            <Label htmlFor="rating" className="block mb-2">
              Your rating <span className="text-red-500">*</span>
            </Label>
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
            <Label htmlFor="review" className="block mb-2">
              Your review <span className="text-red-500">*</span>
            </Label>
            <Textarea id="review" name="review" required rows={5} />
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
