/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
    const storeUser = useMutation(api.user.store);
    const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId: "kg20gd15hk3tv13mxn3edesmhh6z9kj8" });
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#F0F4F8] py-10 font-sans">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Section 1: Logo and description */}
                <div className="space-y-4 text-center md:text-left">
                    <img 
                        src={imageUrl || "/fallback-logo.png"} 
                        alt="Logo" 
                        className="h-20 w-auto mx-auto md:mx-0" 
                    />
                    <p>Smash Limits, Serve Excellence</p>
                    <p>Good and Best</p>
                </div>

                {/* Section 2: Useful Links */}
                <div className="space-y-4">
                    <h5 className="text-lg font-semibold">Useful Links</h5>
                    <ul className="space-y-2">
                        <li><a href="/Accessories" className="text-blue-600 hover:underline">Accessories</a></li>
                        <li><Link href="/AboutUs" className="text-blue-600 hover:underline">About</Link></li>
                        <li><a href="/ContactUs" className="text-blue-600 hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Section 3: Contact Us */}
                <div className="space-y-4 text-center">
                    <h5 className="text-lg font-semibold">Contact Us</h5>
                    <p>
                        <b>E:</b> <a href="mailto:info@example.com">goodandbest@gmail.com</a><br />
                        <b>P:</b> 03 1100 1100<br />
                        <b>A:</b> Mawson Lakes Blvd, Mawson Lakes SA 5095
                    </p>
                </div>

                {/* Section 4: Newsletter Signup */}
                <div className="space-y-4 text-center md:text-right">
                    <h5 className="text-lg font-semibold">Sign up for special offers</h5>
                    <form className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-end space-y-4 md:space-y-0 md:space-x-4">
                        <Input 
                            type="email" 
                            placeholder="Email address" 
                            required 
                            className="w-full md:w-auto"
                        />
                        <Button type="submit" variant="default" className="w-full md:w-auto">
                            Subscribe
                        </Button>
                    </form>
                </div>
            </div>

            {/* Bottom footer with centered copyright */}
            <div className="border-t border-gray-300 mt-10 py-4">
                <div className="container mx-auto text-center">
                    <p className="mb-0">&copy; {currentYear} Good and Best Badminton | Powered by Good and Best</p>
                </div>
            </div>
        </footer>
    );
}
