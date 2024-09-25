/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import TopNavBar from '../TopNavBar'; 
import Footer from '../Footer'; 

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, message });
  };

  return (
    <>
      <TopNavBar /> 
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="flex justify-between items-center p-6 bg-indigo-600 text-white">
            <h1 className="text-3xl font-bold">Contact Us</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 md:h-screen">
            <div className="p-8 bg-indigo-50">
              <h2 className="text-2xl font-semibold mb-6 text-indigo-800">Get in Touch</h2>
              <p className="text-indigo-600 mb-8">
                We'd love to hear from you. Please fill out the form or use our contact information below.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-indigo-700">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span>goodandbest@gmail.com</span>
                </div>
                
                <div className="flex items-center space-x-4 text-indigo-700">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span>03 1100 1100</span>
                </div>
                
                <div className="flex items-center space-x-4 text-indigo-700">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span>Mawson Lakes Blvd, Mawson Lakes SA 5095</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 flex flex-col justify-start">
              <div>
                <Label htmlFor="name" className="text-indigo-700">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-indigo-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-indigo-700">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="mt-1 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
