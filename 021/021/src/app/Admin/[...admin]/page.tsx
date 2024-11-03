import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import InventoryManagement from "@/app/Components/Admin/InventoryManagement";
import CustomerList from "@/app/Components/Admin/CustomerManagement/CustomerList";
import ViewCustomerDetail from "@/app/Components/Admin/CustomerManagement/ViewCustomerDetail";
import LoadingSkeleton from "@/app/Components/LoadingSkeleton";
import ProductManagement from "@/app/Components/Admin/ProductManagement";
import OrderManagement from "@/app/Components/Admin/Ordermanagement/OrderManagement";
import OrderDetail from "@/app/Components/Admin/Ordermanagement/OrderDetail";

interface AdminPageProps {
  params: {
    admin: string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function AdminSubPage({ 
  params,
  searchParams,
}: AdminPageProps) {
  const [section, id, subSection, subId] = params.admin;

  // Handle nested routes
  if (section === "customers") {
    if (id) {
      if (subSection === "orders" && subId) {
        return <OrderDetail orderId={subId} onBack={() => `/Admin/customers/${id}`} />;
      }
      return <ViewCustomerDetail customerId={id} onBack={() => "/Admin/customers"} />;
    }
    return <CustomerList />;
  }

  if (section === "orders") {
    if (id) {
      return <OrderDetail orderId={id} onBack={() => "/Admin/orders"} />;
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
