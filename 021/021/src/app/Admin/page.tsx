"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardOverview from "@/app/Components/Admin/DashboardOverview"
import InventoryManagement from "@/app/Components/Admin/InventoryManagement"
import ProductManagement from "@/app/Components/Admin/ProductManagement"
import CustomerList from "@/app/Components/Admin/CustomerManagement/CustomerList"
import OrderManagement from "@/app/Components/Admin/Ordermanagement/OrderManagement"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import LoadingSkeleton from "@/app/Components/LoadingSkeleton"
import OrderDetail from "@/app/Components/Admin/Ordermanagement/OrderDetail"
import ViewCustomerDetail from "@/app/Components/Admin/CustomerManagement/ViewCustomerDetail"

export default function AdminDashboard() {
  const { user } = useUser()
  const router = useRouter()
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminActiveSection') || "home"
    }
    return "home"
  })
  
  const userDetails = useQuery(api.user.getUserByEmail, {
    email: user?.primaryEmailAddress?.emailAddress || ""
  })

  useEffect(() => {
    // Redirect non-admin users
    if (userDetails && userDetails.userType !== "Admin") {
      router.push("/")
    }
  }, [userDetails, router])

  useEffect(() => {
    // Keep localStorage in sync with active tab
    localStorage.setItem('adminActiveSection', activeTab)
  }, [activeTab])

  if (!userDetails || userDetails.userType !== "Admin") {
    return <LoadingSkeleton />
  }

  const handleOrderView = (orderId: string) => {
    setSelectedOrderId(orderId)
  }

  const handleCustomerView = (customerId: string) => {
    setSelectedCustomerId(customerId)
  }

  const handleBackToOrders = () => {
    setSelectedOrderId(null)
    router.push("/Admin")
    setActiveTab("orders")
  }

  const handleBackToCustomers = () => {
    setSelectedCustomerId(null)
    router.push("/Admin")
    setActiveTab("customers")
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setSelectedOrderId(null)
    setSelectedCustomerId(null)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <DashboardOverview />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryManagement />
        </TabsContent>

        <TabsContent value="products">
          <ProductManagement />
        </TabsContent>

        <TabsContent value="customers">
          {selectedCustomerId ? (
            <ViewCustomerDetail 
              customerId={selectedCustomerId} 
              onBack={handleBackToCustomers}
            />
          ) : (
            <CustomerList onViewCustomer={handleCustomerView} />
          )}
        </TabsContent>

        <TabsContent value="orders">
          {selectedOrderId ? (
            <OrderDetail 
              orderId={selectedOrderId} 
              onBack={handleBackToOrders}
            />
          ) : (
            <OrderManagement onViewOrder={handleOrderView} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}