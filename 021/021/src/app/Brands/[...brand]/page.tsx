import BrandProductsList from "@/app/Components/BrandCatgories/BrandProductsList";
import ProductDetail from "@/app/Components/BrandCatgories/ProductDetail";
import Footer from "@/app/Components/Footer";
import PageNotFound from "@/app/Components/PageNotFound";
import TopNavBar from "@/app/Components/TopNavBar";

interface BrandPageProps {
  params: {
    brand: string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BrandPage({ 
  params,
  searchParams,
}: BrandPageProps) {
  const brandName = params.brand[0];

  if (params.brand.length === 1) {
    return (
      <>
        <TopNavBar />
        <BrandProductsList brand={brandName} />
        <Footer />
      </>
    );
  } else if (params.brand.length === 2) {
    const productId = params.brand[1];
    return (
      <>
        <TopNavBar />
        <ProductDetail productId={productId} brand={brandName} />
        <Footer />
      </>
    );
  } else {
    return <PageNotFound />;
  }
}
