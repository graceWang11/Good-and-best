"use client";

import { useSearchParams } from 'next/navigation';
import BrandProductsList from "@/app/Components/BrandCatgories/BrandProductsList";

export default function BrandPage() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') || '';

  return (
    <div>
      <BrandProductsList brand={brand} />
    </div>
  );
}
