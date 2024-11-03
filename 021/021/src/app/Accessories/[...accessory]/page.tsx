// Import necessary components
import AccessoriesDetail from "@/app/Components/Accessories/AccessoriesDetail";
import Footer from "@/app/Components/Footer";
import PageNotFound from "@/app/Components/PageNotFound";
import TopNavBar from "@/app/Components/TopNavBar";

interface AccessoriesProps {
    params: Promise<{
      accessory: string[];
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
  


// Define the Accessories component
export default async function Accessories({
    params,
    searchParams,
  }: AccessoriesProps) {
    // Await the resolved values of params and searchParams
    const { accessory } = await params;
    const query = await searchParams;
  
    // Safely access and trim the first element
    if (accessory.length === 1) {
      const accessoryId = accessory[0];
      return (
        <>
          <TopNavBar />
          <AccessoriesDetail productId={accessoryId} />
          <Footer />
        </>
      );
    } else {
      return <PageNotFound />;
    }
  }