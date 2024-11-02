"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import InventoryManagement from "@/app/Components/Admin/InventoryManagement"
import CustomerList from "@/app/Components/Admin/CustomerManagement/CustomerList"
import ViewCustomerDetail from "@/app/Components/Admin/CustomerManagement/ViewCustomerDetail"
import LoadingSkeleton from "@/app/Components/LoadingSkeleton"
import ProductManagement from "@/app/Components/Admin/ProductManagement"
import OrderManagement from "@/app/Components/Admin/Ordermanagement/OrderManagement"
import OrderDetail from "@/app/Components/Admin/Ordermanagement/OrderDetail"

export default function AdminSubPage({ params }: { params: { admin: string[] } }) {
  const { user } = useUser()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState(() => {
    // Initialize with localStorage value if exists
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminActiveSection') || "home"
    }
    return "home"
  })

  const userDetails = useQuery(api.user.getUserByEmail, {
    email: user?.primaryEmailAddress?.emailAddress || ""
  })

  useEffect(() => {
    if (userDetails && userDetails.userType !== "Admin") {
      router.push("/")
    }
  }, [userDetails, router])

  // Update localStorage when section changes
  useEffect(() => {
    if (params.admin[0]) {
      const section = params.admin[0]
      setActiveSection(section)
      localStorage.setItem('adminActiveSection', section)
    }
  }, [params.admin])

  if (!userDetails || userDetails.userType !== "Admin") {
    return <LoadingSkeleton />
  }

  const handleBackToCustomers = () => {
    localStorage.setItem('adminActiveSection', 'customers')
    router.push("/Admin")
  }

  const handleBackToOrders = () => {
    localStorage.setItem('adminActiveSection', 'orders')
    router.push("/Admin")
  }

  // Handle different admin sections
  switch (params.admin[0]) {
    case "customers":
      if (params.admin[1]) {
        return <ViewCustomerDetail 
          customerId={params.admin[1]} 
          onBack={handleBackToCustomers}
        />
      }
      return <CustomerList />

    case "inventory":
      return <InventoryManagement />

    case "products":
      return <ProductManagement />

    case "orders":
      if (params.admin[1]) {
        return <OrderDetail 
          orderId={params.admin[1]} 
          onBack={handleBackToOrders}
        />
      }
      return <OrderManagement />

    default:
      return null
  }
}
