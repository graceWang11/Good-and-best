/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Truck, LocateIcon, Lock } from "lucide-react";
import { useState } from "react";

const WhyChooseUs = () => {
  // State to track card hover interaction for animations
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Handle mouse enter and leave to trigger animation
  const handleMouseEnter = (index: number) => setHoveredCard(index);
  const handleMouseLeave = () => setHoveredCard(null);

  return (
    <div className="container mx-auto py-8">
      {/* Section Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-gray-600">
        Shuttlecock ipsum racquet sit amet, smash adipiscing elit, sed do eiusmod volant incididunt ut court et rally. Magna aliqua serve ut enim ad minim backhand, quis nostrud exercitation net shot ullamco. Nisi ut aliquip ex ea commodo consequat dropshot. Duis aute irure dolor in reprehenderit volley velit esse cillum dolore eu forehand nulla pariatur. Excepteur sint occaecat shuttlecock non proident, sunt in culpa qui officia deserunt mollit anim id est Good and Best.
        </p>
      </div>

      {/* Icon Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Fast Delivery Card */}
        <Card 
          className={`text-center transition-transform transform ${
            hoveredCard === 0 ? "scale-105 shadow-lg" : "scale-100"
          }`} 
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
        >
          <CardHeader>
            <div className="flex justify-center">
              <Truck className="h-10 w-10 text-primary mb-4" />
            </div>
            <CardTitle>Fast Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lightning-fast delivery sets us apart in the world of badminton gear. At Good and Best, we understand that when you're gearing up for your next match or training session, time is of the essence. Our streamlined logistics and dedicated shipping partners ensure your equipment reaches you with unparalleled speed. Don't let slow shipping hold back your game – choose us for swift, reliable delivery that keeps you on the court and ahead of the competition.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Order Tracking Card */}
        <Card 
          className={`text-center transition-transform transform ${
            hoveredCard === 1 ? "scale-105 shadow-lg" : "scale-100"
          }`}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        >
          <CardHeader>
            <div className="flex justify-center">
              <LocateIcon className="h-10 w-10 text-primary mb-4" />
            </div>
            <CardTitle>Order Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              At Good and Best, we believe in keeping you informed every step of the way. Our advanced order tracking system provides real-time updates on your purchase, from the moment you click 'buy' to the instant it arrives at your doorstep. With detailed shipment milestones and precise delivery estimates, you'll always know exactly when your new badminton gear will be ready for action. Choose us for a transparent, stress-free shopping experience that puts you in control.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Secure Payment Card */}
        <Card 
          className={`text-center transition-transform transform ${
            hoveredCard === 2 ? "scale-105 shadow-lg" : "scale-100"
          }`} 
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        >
          <CardHeader>
            <div className="flex justify-center">
              <Lock className="h-10 w-10 text-primary mb-4" />
            </div>
            <CardTitle>Secure Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Your financial security is our top priority at Good and Best. We've implemented state-of-the-art encryption and fraud prevention technologies to ensure your payments are always safe and protected. Our platform supports a wide range of secure payment options, giving you the flexibility to choose what works best for you. Shop with confidence, knowing that your sensitive information is guarded by industry-leading security measures. With us, you can focus on your game, not payment worries.
            </CardDescription>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default WhyChooseUs;
