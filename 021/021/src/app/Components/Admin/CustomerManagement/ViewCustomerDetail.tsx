"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, Mail, Phone, MapPin, Calendar, DollarSign, ShoppingBag, ArrowLeft } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "../../LoadingSkeleton";
import { Id } from "../../../../../convex/_generated/dataModel";

interface ViewCustomerDetailProps {
  customerId: Id<"users">;
}

export default function ViewCustomerDetail({ customerId }: ViewCustomerDetailProps) {
  const router = useRouter();
  
  // Convert string ID to Convex ID type
  const customerDetails = useQuery(api.user.getUserById, { 
    userId: customerId
  });
  
  const customerOrders = useQuery(api.order.getOrdersByCustomerId, { 
    customerId: customerId as Id<"users">
  });

  console.log("Customer Details:", customerDetails);
  console.log("Customer Orders:", customerOrders);

  if (!customerDetails || !customerOrders) {
    return <LoadingSkeleton />;
  }

  const handleOrderView = (orderId: string) => {
    console.log("Viewing order:", orderId, "for customer:", customerId);
    router.push(`/Admin/customers/${customerId}/orders/${orderId}`);
  };

  // Handle back navigation
  const handleBack = () => {
    console.log("Going back to customer list");
    router.push("/Admin");
  };

  const totalSpent = customerOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const monthlySpending = Array(12).fill(0).map((_, index) => {
    const monthOrders = customerOrders.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate.getMonth() === index;
    });
    return {
      month: new Date(2024, index).toLocaleString('default', { month: 'short' }),
      amount: monthOrders.reduce((sum, order) => sum + order.totalAmount, 0)
    };
  });

  return (
    <div className="container mx-auto p-4">
      <Button 
        variant="outline" 
        className="mb-4" 
        onClick={handleBack}
        type="button"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Customer List
      </Button>

      {/* Rest of your component JSX */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Detailed profile of {customerDetails.userName}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Customer information content */}
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback>
                  {customerDetails.userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{customerDetails.userName}</h2>
                <p className="text-sm text-muted-foreground">Customer ID: {customerId}</p>
              </div>
            </div>
            <div className="space-y-2">
              {/* Customer details */}
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <span>{customerDetails.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <span>{customerDetails.phoneNumber}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{customerDetails.address}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Joined on {new Date(customerDetails._creationTime).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                <span>Total Spent: ${totalSpent.toFixed(2)}</span>
              </div>
              <div className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>Total Orders: {customerOrders.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Card */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Analytics</CardTitle>
            <CardDescription>Spending patterns and order frequency</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySpending}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" name="Monthly Spending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Order History */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>Recent purchases and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleOrderView(order._id)}
                      type="button"
                    >
                      View Order
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}