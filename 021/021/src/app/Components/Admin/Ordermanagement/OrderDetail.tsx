"use client"

import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Id } from "../../../../../convex/_generated/dataModel"

interface OrderDetail {
  _id: string;
  productName: string;
  quantity: number;
  price: number;
  sizeValue?: string;
  sizeRegion?: string;
}

interface OrderDetailsResponse {
  order: {
    _id: string;
    orderDate: string;
    totalAmount: number;
    status: string;
    customerName: string;
  };
  orderDetails: OrderDetail[];
}

interface OrderDetailProps {
  orderId: string;
  onBack?: () => void;
  backButtonText?: string;
}

export default function OrderDetail({ orderId, onBack, backButtonText = "Back to Orders" }: OrderDetailProps) {
  const router = useRouter()
  
  console.log("Received order ID in component:", orderId);
  
  const orderDetails = useQuery(api.order.getOrderDetails, { 
    orderId: orderId
  }) as OrderDetailsResponse | undefined

  if (!orderDetails) {
    return <div>Loading...</div>
  }

  const formatOrderDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Order ID: {orderId}</CardDescription>
          </div>
          <Button variant="outline" onClick={onBack}>
            {backButtonText}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Customer</p>
              <p className="font-medium">{orderDetails.order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium">{formatOrderDate(orderDetails.order.orderDate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="outline" className={getStatusBadgeColor(orderDetails.order.status)}>
                {orderDetails.order.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="font-medium">${orderDetails.order.totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Order Items</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderDetails.orderDetails.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      {item.sizeValue && (
                        <p className="text-sm text-muted-foreground">
                          Size: {item.sizeValue} ({item.sizeRegion})
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
