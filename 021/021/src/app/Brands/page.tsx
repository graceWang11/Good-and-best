"use client";

import { useSearchParams } from 'next/navigation';
import BrandProductsList from "@/app/Components/BrandCatgories/BrandProductsList";

export default function BrandPage() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') || '';

  return (
    <div>
      <h1>Welcome to the {brand} brand page!</h1>
      <BrandProductsList brand={brand} />
    </div>
  );
}
