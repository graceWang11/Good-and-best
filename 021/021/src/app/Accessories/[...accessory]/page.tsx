// Import necessary components
import AccessoriesDetail from "@/app/Components/Accessories/AccessoriesDetail";
import Footer from "@/app/Components/Footer";
import PageNotFound from "@/app/Components/PageNotFound";
import TopNavBar from "@/app/Components/TopNavBar";

// Define the interface for the component props
interface AccessoriesProps {
  params: {
    accessory: string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Define the Accessories component
export default function Accessories({
  params,
  searchParams,
}: AccessoriesProps) {
  // Check if the accessory parameter has exactly one item
  if (params.accessory.length === 1) {
    const accessoryId = params.accessory[0];
    return (
      <>
        <TopNavBar />
        <AccessoriesDetail productId={accessoryId} />
        <Footer />
      </>
    );
  } else {
    // Render the PageNotFound component if the condition is not met
    return <PageNotFound />;
  }
}
