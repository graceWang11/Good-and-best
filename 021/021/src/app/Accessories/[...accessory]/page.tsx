"use client";

import React from 'react';
import AccessoriesDetail from "@/app/Components/Accessories/AccessoriesDetail";
import Footer from "@/app/Components/Footer";
import PageNotFound from "@/app/Components/PageNotFound";
import TopNavBar from "@/app/Components/TopNavBar";

export default function Accessories({ 
  params 
}: { 
  params: { accessory: string[] } 
}) {
  // Unwrap params using React.use()
  const unwrappedParams = React.use(Promise.resolve(params));

  // Safely access and trim the first element
  if (unwrappedParams.accessory.length === 1) {
    const accessoryId = unwrappedParams.accessory[0];
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
