import AccessoriesDetail from "@/app/Components/Accessories/AccessoriesDetail";
import Footer from "@/app/Components/Footer";
import PageNotFound from "@/app/Components/PageNotFound";
import TopNavBar from "@/app/Components/TopNavBar";

interface AccessoriesProps {
  params: {
    accessory: string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Accessories({ 
  params,
  searchParams,
}: AccessoriesProps) {
  // Safely access and trim the first element
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
    return <PageNotFound />;
  }
}
