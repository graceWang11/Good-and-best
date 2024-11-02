"use client"

import OrderDetail from "@/app/Components/Admin/Ordermanagement/OrderDetail"
import { useRouter } from "next/navigation"

export default function CustomerOrderDetailPage({ 
  params 
}: { 
  params: { 
    customerId: string;
    orderId: string;
  } 
}) {
  const router = useRouter()

  const handleBack = () => {
    router.push(`/Admin/customers/${params.customerId}`)
  }

  return (
    <div className="p-4">
      <OrderDetail 
        orderId={params.orderId} 
        onBack={handleBack}
        backButtonText="Back to Customer Details"  // Optional: customize back button text
      />
    </div>
  )
} 