/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const storeUser = useMutation(api.user.store);
    const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId: "kg24rhn3h8nnkc7vtzt04jd16d6z9e8m" });
    const currentYear = new Date().getFullYear();

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
            // Initialize EmailJS
            emailjs.init("fZgGzFg1f6E0UD74s");
    
            // Define template parameters
            const templateParams = {
                to_name: email.split('@')[0],
                to_email: email, 
                support_email: "goodandbest@gmail.com",
                website_url: "https://good-and-best.vercel.app",
                current_year: new Date().getFullYear().toString(),
                reply_to: email,
                email: email 
            };
    
            console.log('Sending email with params:', templateParams);
    
            // Send the email using EmailJS
            const response = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
                process.env.NEXT_PUBLIC_EMAILJS_FOOTER_TEMPLATE_ID || '',
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_API_KEY || ''
            );
    
            if (response.status === 200) {
                toast.success("Successfully subscribed! Please check your email (including spam folder).");
                setEmail("");
            }
        } catch (error) {
            console.error("Email sending error:", error);
            toast.error("Failed to subscribe. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info - Centered on mobile */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold mb-4">Good and Best</h3>
                        <p className="mb-2">123 Sports Street</p>
                        <p className="mb-2">Tokyo, Japan</p>
                        <p className="mb-2">Phone: (123) 456-7890</p>
                        <p>Email: info@goodandbest.com</p>
                    </div>

                    {/* Useful Links - Centered on mobile */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-xl font-bold mb-4">Useful Links</h3>
                        <nav className="space-y-2 text-center md:text-left">
                            <Link href="/AboutUs" className="block hover:text-gray-300">
                                About Us
                            </Link>
                            <Link href="/ContactUs" className="block hover:text-gray-300">
                                Contact Us
                            </Link>
                            <Link href="/Rackets" className="block hover:text-gray-300">
                                Shop Rackets
                            </Link>
                            <Link href="/Shoes" className="block hover:text-gray-300">
                                Shop Shoes
                            </Link>
                            <Link href="/Accessories" className="block hover:text-gray-300">
                                Accessories
                            </Link>
                        </nav>
                    </div>

                    {/* Social Media - Centered on mobile */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a
                                href="#"
                                className="hover:text-gray-300 transition-colors"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={24} />
                            </a>
                            <a
                                href="#"
                                className="hover:text-gray-300 transition-colors"
                                aria-label="Twitter"
                            >
                                <FaTwitter size={24} />
                            </a>
                            <a
                                href="#"
                                className="hover:text-gray-300 transition-colors"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright - Always centered */}
                <div className="text-center mt-8 pt-8 border-t border-gray-800">
                    <p>&copy; 2024 Good and Best. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
