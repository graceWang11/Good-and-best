"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Id } from "../../../../../convex/_generated/dataModel"

export default function OrderManagement() {
  const router = useRouter()
  // Initialize with localStorage value if exists, otherwise use "Q1"
  const [selectedQuarter, setSelectedQuarter] = useState(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedQuarter') || "Q1"
    }
    return "Q1"
  })
  
  const orders = useQuery(api.order.getAll)

  // Update localStorage when quarter changes
  useEffect(() => {
    localStorage.setItem('selectedQuarter', selectedQuarter)
  }, [selectedQuarter])

  // Function to filter orders by quarter
  const filterOrdersByQuarter = (orders: any[]) => {
    if (!orders) return []
    
    const quarterMonths = {
      Q1: [0, 1, 2],    // Jan-Mar
      Q2: [3, 4, 5],    // Apr-Jun
      Q3: [6, 7, 8],    // Jul-Sep
      Q4: [9, 10, 11],  // Oct-Dec
    }

    return orders.filter(order => {
      const orderDate = new Date(order.orderDate)
      const month = orderDate.getMonth()
      return quarterMonths[selectedQuarter as keyof typeof quarterMonths].includes(month)
    })
  }

  const filteredOrders = filterOrdersByQuarter(orders ?? [])

  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  // Function to format date
  const formatOrderDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Function to handle view detail click
  const handleViewDetail = (orderId: Id<"orders">) => {
    console.log("Viewing order:", orderId);
    router.push(`/Admin/orders/${orderId}`);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Order Management</CardTitle>
          <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Quarter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Q1">Q1 (Jan-Mar)</SelectItem>
              <SelectItem value="Q2">Q2 (Apr-Jun)</SelectItem>
              <SelectItem value="Q3">Q3 (Jul-Sep)</SelectItem>
              <SelectItem value="Q4">Q4 (Oct-Dec)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription>View and manage orders for {selectedQuarter}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders?.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">
                  {order._id.substring(0, 8)}
                </TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{formatOrderDate(order.orderDate)}</TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadgeColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.orderDetails?.length || 0} items</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetail(order._id as Id<"orders">)}
                  >
                    View Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {(!filteredOrders || filteredOrders.length === 0) && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No orders found for this quarter
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
