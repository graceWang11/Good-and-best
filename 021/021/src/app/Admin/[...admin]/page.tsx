"use client";

import React from 'react';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import InventoryManagement from "@/app/Components/Admin/InventoryManagement";
import CustomerList from "@/app/Components/Admin/CustomerManagement/CustomerList";
import ViewCustomerDetail from "@/app/Components/Admin/CustomerManagement/ViewCustomerDetail";
import LoadingSkeleton from "@/app/Components/LoadingSkeleton";
import ProductManagement from "@/app/Components/Admin/ProductManagement";
import OrderManagement from "@/app/Components/Admin/Ordermanagement/OrderManagement";
import OrderDetail from "@/app/Components/Admin/Ordermanagement/OrderDetail";

export default function AdminSubPage({ 
  params 
}: { 
  params: { admin: string[] } 
}) {
  // Unwrap params using React.use()
  const unwrappedParams = React.use(Promise.resolve(params));
  const [section, id, subSection, subId] = unwrappedParams.admin;

  const { user } = useUser();
  const router = useRouter();

  const userDetails = useQuery(api.user.getUserByEmail, {
    email: user?.primaryEmailAddress?.emailAddress || ""
  });

  useEffect(() => {
    if (userDetails && userDetails.userType !== "Admin") {
      router.push("/");
    }
  }, [userDetails, router]);

  if (!userDetails || userDetails.userType !== "Admin") {
    return <LoadingSkeleton />;
  }

  // Handle nested routes
  if (section === "customers") {
    if (id) {
      if (subSection === "orders" && subId) {
        return <OrderDetail orderId={subId} onBack={() => router.push(`/Admin/customers/${id}`)} />;
      }
      return <ViewCustomerDetail customerId={id} onBack={() => router.push("/Admin/customers")} />;
    }
    return <CustomerList />;
  }

  if (section === "orders") {
    if (id) {
      return <OrderDetail orderId={id} onBack={() => router.push("/Admin/orders")} />;
    }
    return <OrderManagement />;
  }

  if (section === "inventory") {
    return <InventoryManagement />;
  }

  if (section === "products") {
    return <ProductManagement />;
  }

  router.push("/Admin");
  return <LoadingSkeleton />;
}
