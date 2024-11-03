"use client";

import React from 'react';
import BrandProductsList from "@/app/Components/BrandCatgories/BrandProductsList";
import ProductDetail from "@/app/Components/BrandCatgories/ProductDetail";
import Footer from "@/app/Components/Footer";
import PageNotFound from "@/app/Components/PageNotFound";
import TopNavBar from "@/app/Components/TopNavBar";

export default function BrandPage({ 
  params 
}: { 
  params: { brand: string[] } 
}) {
  // Unwrap params using React.use()
  const unwrappedParams = React.use(Promise.resolve(params));
  const brandName = unwrappedParams.brand[0]; // Extract the brand name from the array

  // Check if the slug has 1 or 2 parts
  if (unwrappedParams.brand.length === 1) {
    return (
      <>
        <TopNavBar />
        <BrandProductsList brand={brandName} />
        <Footer />
      </>
    );
  } else if (unwrappedParams.brand.length === 2) {
    const productId = unwrappedParams.brand[1]; // Extract product ID from the URL
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
