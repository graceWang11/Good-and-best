"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import InventoryManagement from "@/app/Components/Admin/InventoryManagement"
import CustomerList from "@/app/Components/Admin/CustomerList"
// import OrderManagement from "@/app/Components/Admin/OrderManagement"

export default function AdminSubPage({ params }: { params: { admin: string[] } }) {
  const { user } = useUser()
  const router = useRouter()
  const userDetails = useQuery(api.user.getUserByEmail, {
    email: user?.primaryEmailAddress?.emailAddress || ""
  })

  useEffect(() => {
    // Redirect non-admin users
    if (userDetails && userDetails.userType !== "Admin") {
      router.push("/")
    }
  }, [userDetails, router])

  if (!userDetails || userDetails.userType !== "Admin") {
    return <div>Loading...</div>
  }

  // Get the specific admin route
  const adminRoute = params.admin[0]

  // Return the appropriate component based on the route
  switch (adminRoute) {
    case "inventory":
      return <InventoryManagement />
    case "customers":
      return <CustomerList />
    // case "orders":
    //   return <OrderManagement />
    default:
      router.push("/Admin")
      return null
  }
}
