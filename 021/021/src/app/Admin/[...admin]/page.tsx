// Remove "use client" since this will be a Server Component
import { headers } from 'next/headers';
import InventoryManagement from "@/app/Components/Admin/InventoryManagement";
import CustomerList from "@/app/Components/Admin/CustomerManagement/CustomerList";
import ViewCustomerDetail from "@/app/Components/Admin/CustomerManagement/ViewCustomerDetail";
import LoadingSkeleton from "@/app/Components/LoadingSkeleton";
import ProductManagement from "@/app/Components/Admin/ProductManagement";
import OrderManagement from "@/app/Components/Admin/Ordermanagement/OrderManagement";
import OrderDetail from "@/app/Components/Admin/Ordermanagement/OrderDetail";
import { Id } from '../../../../convex/_generated/dataModel';

interface AdminPageProps {
  params: Promise<{
    admin: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminSubPage({
  params,
  searchParams,
}: AdminPageProps) {
  // Properly await headers
  const headersList = await headers();
  
  const { admin } = await params;
  const [section, id, subSection, subId] = admin;

  // Handle nested routes
  if (section === "customers") {
    if (id) {
      if (subSection === "orders" && subId) {
        return <OrderDetail orderId={subId} />;
      }
      return <ViewCustomerDetail customerId={id as Id<"users">} />;
    }
    return <CustomerList />;
  }

  if (section === "orders") {
    if (id) {
      return <OrderDetail orderId={id} />;
    }
    return <OrderManagement />;
  }

  if (section === "inventory") {
    return <InventoryManagement />;
  }

  if (section === "products") {
    return <ProductManagement />;
  }

  return <LoadingSkeleton />;
}