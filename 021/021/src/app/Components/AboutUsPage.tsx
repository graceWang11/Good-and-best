/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Home, Users, Award, Briefcase } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { useQuery } from "convex/react"; 
import { api } from "../../../convex/_generated/api";

export default function AboutUs() {
  // Fetch image URL
  const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId: "kg20gd15hk3tv13mxn3edesmhh6z9kj8" });

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900">About Us</h1>
          <Link href="/" passHref>
            <Button variant="outline" className="flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Back to Main Page
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2024, our company has been at the forefront of innovation in our industry. 
              We started with a simple idea: to create products that make people's lives easier and more enjoyable.
            </p>
            <p className="text-gray-700">
              Over the years, we've grown from a small startup to a global brand, but our core mission remains the same. 
              We're committed to quality, sustainability, and customer satisfaction in everything we do.
            </p>
          </div>
          <div className="relative h-64 md:h-auto">
            {/* Replaced with the fetched image URL */}
            <img 
              src={imageUrl} 
              alt="Our team" 
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Rest of your component remains unchanged */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-6 h-6 mr-2 text-indigo-600" />
                Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our diverse team of experts brings a wealth of experience and fresh perspectives to every project.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-6 h-6 mr-2 text-indigo-600" />
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Integrity, innovation, and customer focus are at the heart of everything we do.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-indigo-600" />
                Our Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We've successfully completed over 500 projects for clients across various industries.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Join Our Journey</h2>
          <p className="text-gray-700 mb-6">
            We're always looking for talented individuals to join our team. If you're passionate about what you do and want to make a difference, we'd love to hear from you.
          </p>
        </div>
      </div>
    </div>
  )
}
