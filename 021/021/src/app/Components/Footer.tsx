"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
    const storeUser = useMutation(api.user.store);
    const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId: "kg20gd15hk3tv13mxn3edesmhh6z9kj8" });
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Section 1: Logo and description */}
                <div className="space-y-4">
                    <img 
                        src={imageUrl || "/fallback-logo.png"} 
                        alt="Logo" 
                        className="h-20 w-auto m-4" 
                    />
                    <p>
                        Smash Limits, Serve Excellence
                    </p>
                    <p>
                    Good and Best
                    </p>
                </div>

                {/* Section 2: Social Icons
                <div className="space-y-4">
                    <h5 className="text-lg font-semibold">Follow Us</h5>
                    <div className="flex space-x-4">
                        <a href="#" className="text-blue-600">
                            <FaFacebook size={24} />
                        </a>
                        <a href="#" className="text-blue-400">
                            <FaTwitter size={24} />
                        </a>
                        <a href="#" className="text-red-600">
                            <FaYoutube size={24} />
                        </a>
                    </div>
                </div> */}

                {/* Section 3: Contact Us */}
                <div className="space-y-4">
                    <h5 className="text-lg font-semibold">Contact Us</h5>
                    <p>
                        <b>E:</b> <a href="mailto:info@example.com">goodandbest@gmail.com</a>
                        <br />
                        <b>P:</b> 03 1100 1100
                        <br />
                        <b>A:</b> Mawson Lakes Blvd, Mawson Lakes SA 5095
                    </p>
                </div>

                {/* Section 4: Newsletter Signup */}
                <div className="space-y-4">
                    <h5 className="text-lg font-semibold">Sign up for special offers</h5>
                    <form>
                        <Input type="email" placeholder="Email address" required className="mb-4" />
                        <Button type="submit" variant="primary">Subscribe</Button>
                    </form>
                </div>
            </div>

            {/* Bottom footer with centered copyright */}
            <div className="border-t border-gray-300 mt-10 py-4">
                <div className="container mx-auto text-center">
                    <p className="mb-0">&copy; {currentYear} Good and Best Badminton  | Powered by Good and Best</p>
                </div>
            </div>
        </footer>
    );
}
