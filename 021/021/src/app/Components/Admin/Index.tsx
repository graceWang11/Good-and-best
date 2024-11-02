"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardOverview from "./DashboardOverview"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()

  const handleTabChange = (value: string) => {
    switch (value) {
      case "inventory":
        router.push("/Admin/inventory")
        break
      case "customers":
        router.push("/Admin/customers")
        break
      case "orders":
        router.push("/Admin/orders")
        break
      default:
        router.push("/Admin")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="home" onValueChange={handleTabChange}>
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
      </Tabs>
    </div>
  )
}