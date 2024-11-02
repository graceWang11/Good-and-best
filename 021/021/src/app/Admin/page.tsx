"use client"

import AdminDashboard from "../Components/Admin/Index"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import LoadingSkeleton from "../Components/LoadingSkeleton"

export default function AdminPage() {
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

  return <AdminDashboard />
}