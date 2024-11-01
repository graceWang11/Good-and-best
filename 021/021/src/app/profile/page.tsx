"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import TopNavBar from "../Components/TopNavBar";
import Footer from "../Components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin } from "lucide-react";

export default function ProfilePage() {
  const { user } = useUser();
  const { user: clerkUser } = useClerk();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    streetNumber: "",
    streetName: "",
    suburb: "",
    state: "",
    zipCode: "",
  });

  const updateProfile = useMutation(api.user.updateProfile);
  const userProfile = useQuery(api.user.getUserProfile, {
    email: user?.primaryEmailAddress?.emailAddress || "",
  });

  useEffect(() => {
    if (userProfile) {
      const addressParts = (userProfile.address || "").split(',').map(part => part.trim());
      setFormData({
        userName: userProfile.userName || "",
        phoneNumber: userProfile.phoneNumber || "",
        streetNumber: addressParts[0] || "",
        streetName: addressParts[1] || "",
        suburb: addressParts[2] || "",
        state: addressParts[3] || "",
        zipCode: addressParts[4] || "",
      });
    }
  }, [userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const fullAddress = [
        formData.streetNumber,
        formData.streetName,
        formData.suburb,
        formData.state,
        formData.zipCode
      ].filter(Boolean).join(', ');

      await updateProfile({
        userName: formData.userName,
        email: user?.primaryEmailAddress?.emailAddress || "",
        phoneNumber: formData.phoneNumber,
        address: fullAddress,
      });
      
      await clerkUser?.update({
        firstName: formData.userName.split(' ')[0],
        lastName: formData.userName.split(' ').slice(1).join(' '),
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <TopNavBar />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Profile Settings</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
                  <AvatarFallback>
                    {user?.fullName?.split(' ').map(n => n[0]).join('') || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="userName"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      className="pl-9"
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      value={user?.primaryEmailAddress?.emailAddress || ""}
                      className="pl-9"
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="pl-9"
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="streetNumber">Street Number</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="streetNumber"
                      name="streetNumber"
                      value={formData.streetNumber}
                      onChange={handleChange}
                      className="pl-9"
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="streetName">Street Name</Label>
                  <Input
                    id="streetName"
                    name="streetName"
                    value={formData.streetName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="suburb">Suburb</Label>
                  <Input
                    id="suburb"
                    name="suburb"
                    value={formData.suburb}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

              {isEditing && (
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              )}
            </form>

            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
              <div className="text-sm text-gray-500">
                No orders found.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
} 