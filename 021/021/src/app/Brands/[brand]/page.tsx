"use client";

import BrandProductsList from "@/app/Components/BrandCatgories/BrandProductsList";

export default function BrandPage({ params }: { params: { brand: string } }) {
  return (
    <div>
      <BrandProductsList brand={params.brand} />
    </div>
  );
}
