"use client"

import React, { useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
  params,
}: {
  params: { admin: string[] | undefined };
}) {
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

  const handleBackToCustomers = () => {
    localStorage.setItem('adminActiveSection', 'customers');
    router.push("/Admin");
  };

  const handleBackToOrders = () => {
    localStorage.setItem('adminActiveSection', 'orders');
    router.push("/Admin");
  };

  // Get the path segments directly from params with a fallback in case params.admin is undefined
  const [section, id, subSection, subId] = params.admin || [];

  // Handle nested routes
  if (section === "customers") {
    if (id) {
      if (subSection === "orders" && subId) {
        // Handle customer's specific order view
        return <OrderDetail orderId={subId} onBack={() => router.push(`/Admin/customers/${id}`)} />;
      }
      // Handle customer detail view
      return <ViewCustomerDetail customerId={id} onBack={handleBackToCustomers} />;
    }
    return <CustomerList />;
  }

  if (section === "orders") {
    if (id) {
      return <OrderDetail orderId={id} onBack={handleBackToOrders} />;
    }
    return <OrderManagement />;
  }

  if (section === "inventory") {
    return <InventoryManagement />;
  }

  if (section === "products") {
    return <ProductManagement />;
  }

  // Default case
  router.push("/Admin");
  return <LoadingSkeleton />;
}
