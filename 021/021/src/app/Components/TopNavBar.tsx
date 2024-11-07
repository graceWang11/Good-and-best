/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  FaShoppingCart,
  FaBars,
  FaSearch,
  FaChevronLeft,
} from "react-icons/fa";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "./CartContext";
import CartSidebar from "./Cartsidebar";
import LoginButton from "./Login";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import LoadingSkeleton from "./LoadingSkeleton";
import logoImage from '../../assets/images/good and best .png';


type Product = {
  _id: string;
  productName: string;
  brand: string;
  price: number;
  imageUrls: string[];
};

export default function TopNavBar() {
  const storeUser = useMutation(api.user.store);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user, isSignedIn } = useUser();

  const { cartItems } = useCart();


  // Fetch all products (you might want to optimize this for larger datasets)
  const allProducts = useQuery(api.Product.getAllWithImages) || [];

  // Compute search results
  const searchResults = useMemo(() => {
    if (searchQuery.length > 0) {
      const filteredProducts = allProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return filteredProducts.map((product) => ({
        ...product,
        imageUrls: product.imageUrls.filter((url) => url !== null),
      }));
    } else {
      return [];
    }
  }, [searchQuery, allProducts]);

  // Determine whether to show the dropdown
  const showDropdown = searchResults.length > 0 && searchQuery.length > 0;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleProductSelect = (product: Product) => {
    setSearchQuery("");
    router.push(
      `/Brands/${product.brand}/${product._id}`
    );
  };

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  useEffect(() => {
    if (isSignedIn && user?.primaryEmailAddress?.emailAddress === "goodandbestteam@gmail.com") {
      router.push('/Admin');
    }
  }, [isSignedIn, user, router]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // if (!imageUrl) {
  //   return <LoadingSkeleton />
  // }

  return (
    <header className="flex items-center justify-between w-full px-4 py-2 bg-white shadow-md">
      {/* Left section: Navigation */}
      <nav className="hidden md:flex space-x-8 items-baseline">
        <Link href="/Rackets" className="text-gray-600 hover:text-gray-900">
          Shop Rackets
        </Link>
        <Link href="/Shoes" className="text-gray-600 hover:text-gray-900">
          Shop Shoes
        </Link>
        <Link href="/Accessories" className="text-gray-600 hover:text-gray-900">
          Accessories
        </Link>
        <Link href="/AboutUs" className="text-gray-600 hover:text-gray-900">
          About
        </Link>
        <Link href="/ContactUs" className="text-gray-600 hover:text-gray-900">
          Contact
        </Link>
      </nav>

      {/* Center section: Logo */}
      <Link href="/" className="flex items-center justify-center flex-col">
        <div className="relative w-[120px] h-[40px]">
          <img
            src={logoImage.src}
            alt="Logo"
            className="w-full h-full object-contain cursor-pointer"
          />
        </div>
        <p className="text-center text-sm font-semibold">Good and Best</p>
      </Link>

      {/* Right section: Search, Cart, and User/Login */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Input
            placeholder="Search..."
            className="w-64 h-10 px-3 py-2 border border-gray-300 rounded"
            value={searchQuery}
            onChange={handleSearchChange}
          />
              {showDropdown && (
                <div className="absolute z-10 w-96 bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-96 overflow-y-auto">
                  {searchResults.map((product: Product) => (
                    <div
                      key={product._id}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleProductSelect(product)}
                >
                  {product.imageUrls && product.imageUrls.length > 0 && (
                    <img
                      src={product.imageUrls[0]}
                      alt={product.productName}
                      className="w-12 h-12 object-cover mr-4"
                    />
                  )}
                  <div>
                    <div className="font-semibold">{product.productName}</div>
                    <div className="text-sm text-gray-600">
                      ¥{product.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          className="relative"
          onClick={() => setIsCartOpen(true)}
        >
          <FaShoppingCart className="text-gray-700" size={24} />
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
              {totalQuantity}
            </span>
          )}
        </Button>

        <LoginButton />

        {/* Mobile Menu Button */}
        <Button
          className="md:hidden text-gray-600 hover:text-gray-900"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden fixed top-[64px] left-0 right-0 bg-white shadow-lg p-4 space-y-2 z-40">
          <Link
            href="/Rackets"
            className="block text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-md transition-colors"
          >
            Shop Rackets
          </Link>
          <Link
            href="/Shoes"
            className="block text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-md transition-colors"
          >
            Shop Shoes
          </Link>
          <Link
            href="/Accessories"
            className="block text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-md transition-colors"
          >
            Accessories
          </Link>
          <Link
            href="/AboutUs"
            className="block text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-md transition-colors"
          >
            About
          </Link>
          <Link
            href="/ContactUs"
            className="block text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-md transition-colors"
          >
            Contact
          </Link>
        </nav>
      )}

      {/* Cart Sidebar */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="right">
          <CartSidebar onClose={() => setIsCartOpen(false)} />
        </SheetContent>
      </Sheet>
    </header>
  );
}