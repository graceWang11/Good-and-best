"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import InventoryManagement from "@/app/Components/Admin/InventoryManagement"
import CustomerList from "@/app/Components/Admin/CustomerManagement/CustomerList"
import ViewCustomerDetail from "@/app/Components/Admin/CustomerManagement/ViewCustomerDetail"
import LoadingSkeleton from "@/app/Components/LoadingSkeleton"
import ProductManagement from "@/app/Components/Admin/ProductManagement"
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
    return <LoadingSkeleton />
  }

  console.log("Admin route params:", params.admin); // Debug log

  if (params.admin[0] === "customers") {
    if (params.admin[1]) {
      return <ViewCustomerDetail customerId={params.admin[1]} />
    }
    return <CustomerList />
  }

  if (params.admin[0] === "inventory") {
    return <InventoryManagement />
  }

  if (params.admin[0] === "products") {
    return <ProductManagement />
  }

  router.push("/Admin")
  return null
}
