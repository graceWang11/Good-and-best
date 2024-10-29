"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export type CartItem = {
  productId: string;
  productName: string;
  price: number;
  imageId: string;
  quantity: number;
  size?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  placeOrder: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Add localStorage persistence
const CART_STORAGE_KEY = 'shopping-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      // Check if item is already in cart
      const existingItem = prevItems.find(
        (i) => i.productId === item.productId && i.size === item.size
      );
      if (existingItem) {
        // Update quantity
        return prevItems.map((i) =>
          i.productId === item.productId && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevItems, item];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string, size?: string) => {
    setCartItems((prevItems) => 
      prevItems.filter((item) => {
        // For shoes (items with size), match both productId and size
        if (item.size) {
          return !(item.productId === productId && item.size === size);
        }
        // For non-shoe products, just match productId
        return item.productId !== productId;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const updateStock = useMutation(api.Product.updateProductStock);
  
  const placeOrder = async () => {
    try {
      // Process each cart item
      for (const item of cartItems) {
        await updateStock({
          productId: item.productId as Id<"products">,
          quantity: item.quantity,
          size: item.size // This will be undefined for non-shoe products
        });
      }
      
      // Clear the cart after successful order
      clearCart();
      
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        clearCart, 
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        getTotalItems,
        placeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
