/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useCart } from "./CartContext";
import type { CartItem } from "./CartContext";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CartSidebar = ({ onClose }: { onClose: () => void }) => {
  const { cartItems, removeFromCart, clearCart, updateQuantity, getTotalPrice } = useCart();
  const placeOrder = useMutation(api.order.placeOrder);
  const { isSignedIn } = useUser();
  const router = useRouter();
  
  // Handle placing the order
  const handlePlaceOrder = async () => {
    if (!isSignedIn) {
      // Redirect to sign in if not authenticated
      router.push('/sign-in');
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      await placeOrder({ cartItems });
      clearCart();
      alert("Order placed successfully!");
      onClose();
      // Optionally redirect to order confirmation page
      router.push('/order-confirmation');
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Shopping Cart</h2>
        <Button variant="ghost" onClick={onClose}>✕</Button>
      </div>

      <div className="flex-grow overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={`${item.productId}-${item.size}`}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))
        )}
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
        </div>
        
        <Button
          className="w-full"
          onClick={handlePlaceOrder}
          disabled={cartItems.length === 0}
        >
          {isSignedIn ? 'Place Order' : 'Sign in to Order'}
        </Button>
      </div>
    </div>
  );
};

// Separate CartItem component for better organization
const CartItem = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: { 
  item: CartItem; 
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) => {
  const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId: item.imageId });

  return (
    <div className="flex items-center gap-4 mb-4 p-2 border rounded">
      <div className="w-16 h-16">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={item.productName}
            className="w-full h-full object-cover rounded"
          />
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium">{item.productName}</h3>
        {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
        <p className="text-sm">${item.price}</p>
        
        <div className="flex items-center gap-2 mt-2">
          <Input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => onUpdateQuantity(item.productId, parseInt(e.target.value))}
            className="w-20"
          />
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onRemove(item.productId)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
