/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from 'lucide-react';

export default function ReviewForm({ productName, productId }: { productName: string, productId: string }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Collect form data
    const formData = new FormData(event.currentTarget);
    
    // Send the data to the server
    const response = await fetch('/api/submit-review', {
      method: 'POST',
      body: JSON.stringify({
        productId,
        rating,
        // Add other form fields as needed
      }),
    });
    
    // Handle the response
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Be the first to review "{productName}"</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
  );
}
