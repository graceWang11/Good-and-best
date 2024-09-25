"use client";

import BrandProductsList from "@/app/Components/BrandCatgories/BrandProductsList";
import ProductDetail from "@/app/Components/BrandCatgories/ProductDetail";
import Footer from "@/app/Components/Footer";
import PageNotFound from "@/app/Components/PageNotFound";
import TopNavBar from "@/app/Components/TopNavBar";

export default function BrandPage({ params }: { params: { brand: string[] } }) {
  const brandName = params.brand[0]; // Extract the brand name from the array

  // Check if the slug has 1 or 2 parts
  if (params.brand.length === 1) {
    return (
      <>
        <TopNavBar />
        <BrandProductsList brand={brandName} />
        <Footer />
      </>
    );
  }else if (params.brand.length === 2) {
    const productId = params.brand[1]; // Extract product ID from the URL
    return (
      <>
        <TopNavBar />
        <ProductDetail productId={productId} brand={brandName} />
        <Footer />
      </>
    );
  } else {
    return <PageNotFound />
  }
}
