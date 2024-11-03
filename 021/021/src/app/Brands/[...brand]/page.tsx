import BrandProductsList from "@/app/Components/BrandCatgories/BrandProductsList";
import ProductDetail from "@/app/Components/BrandCatgories/ProductDetail";
import Footer from "@/app/Components/Footer";
import PageNotFound from "@/app/Components/PageNotFound";
import TopNavBar from "@/app/Components/TopNavBar";

interface BrandPageProps {
  params: Promise<{
    brand: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}


export default async function BrandPage({
  params,
  searchParams,
}: BrandPageProps) {
  // Await the resolved values of params and searchParams
  const { brand } = await params;
  const query = await searchParams;

  if (brand.length === 1) {
    const brandName = brand[0];
    return (
      <>
        <TopNavBar />
        <BrandProductsList brand={brandName} />
        <Footer />
      </>
    );
  } else if (brand.length === 2) {
    const [brandName, productId] = brand;
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