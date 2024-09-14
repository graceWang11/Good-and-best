"use client";

import { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api"; 
import { useQuery } from "convex/react";

export default function TopNavBar() {
    const storeUser = useMutation(api.user.store);
    const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId: "kg20gd15hk3tv13mxn3edesmhh6z9kj8" });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (!imageUrl) {
        return <div>Loading...</div>;
    }

    return (
        <header className="flex items-center justify-between w-full px-4 py-2 bg-white shadow-md">
            {/* Left section: Navigation */}
            <nav className="hidden md:flex space-x-8 items-baseline"> {/* Hidden on mobile, visible on larger screens */}
                <Link href="/shop" className="text-gray-600 hover:text-gray-900">
                    Shop All
                </Link>
                <Link href="/category/electric-scooters" className="text-gray-600 hover:text-gray-900">
                    Electric Scooters
                </Link>
                <Link href="/category/accessories" className="text-gray-600 hover:text-gray-900">
                    Accessories
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                    About
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                    Contact
                </Link>
            </nav>

            {/* Center section: Logo */}
            <div className="flex items-center justify-center flex-col">
                <img 
                    src={imageUrl} 
                    alt="Logo" 
                    className="h-16 w-auto m-4"  // Adjusted size for the logo
                />
                <p className="text-center text-sm font-semibold">Good and Best</p>
            </div>

            {/* Right section: Search, Cart, and User/Login */}
            <div className="flex items-center space-x-4">
                <Input placeholder="Search..." className="w-48 h-10 px-3 py-2 border border-gray-300 rounded" />
                <Button variant="default" className="bg-blue-500 text-white">Search</Button>
                <Link href="/cart">
                    <div className="relative">
                        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">0</span>
                        <FaShoppingCart className="text-gray-700" size={24} />
                    </div>
                </Link>

                {/* Login/User Icon */}
                <Link href="/login">
                    <Button variant="ghost">
                        <FaUser className="text-gray-700" size={24} />
                    </Button>
                </Link>

                {/* Mobile Menu Button */}
                <Button
                    className="md:hidden text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        )}
                    </svg>
                </Button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <nav className="md:hidden bg-gray-100 p-4 space-y-2"> {/* Mobile navigation */}
                    <Link href="/shop" className="block text-gray-700 hover:bg-gray-200 py-2 px-4 rounded-md">
                        Shop All
                    </Link>
                    <Link href="/category/electric-scooters" className="block text-gray-700 hover:bg-gray-200 py-2 px-4 rounded-md">
                        Electric Scooters
                    </Link>
                    <Link href="/category/accessories" className="block text-gray-700 hover:bg-gray-200 py-2 px-4 rounded-md">
                        Accessories
                    </Link>
                    <Link href="/about" className="block text-gray-700 hover:bg-gray-200 py-2 px-4 rounded-md">
                        About
                    </Link>
                    <Link href="/contact" className="block text-gray-700 hover:bg-gray-200 py-2 px-4 rounded-md">
                        Contact
                    </Link>
                </nav>
            )}
        </header>
    );
}
