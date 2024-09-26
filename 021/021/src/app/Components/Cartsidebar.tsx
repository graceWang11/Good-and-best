/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart } from "./CartContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";

export default function CartSidebar({ onClose }: { onClose: () => void }) {
  const { cartItems, clearCart } = useCart();
  const placeOrder = useMutation(api.order.placeOrder);

  const handlePlaceOrder = async () => {
    try {
      await placeOrder({ cartItems });
      clearCart();
      onClose();
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ScrollArea className="flex-1">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center mb-4">
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <p className="font-semibold">{item.productName}</p>
                  {item.size && <p>Size: {item.size}</p>}
                  <p>
                    Quantity: {item.quantity} x ¥{item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Total: ¥{totalPrice.toFixed(2)}
            </p>
            <Button onClick={handlePlaceOrder} className="w-full mt-4">
              Place Order
            </Button>
          </div>
        </>
      )}
    </div>
  );
}