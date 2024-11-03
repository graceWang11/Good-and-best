
import React from 'react';
import ShoesDetail from "@/app/Components/Shoes/ShoesDetail";
import TopNavBar from "@/app/Components/TopNavBar";
import Footer from "@/app/Components/Footer";
import PageNotFound from "@/app/Components/PageNotFound";

interface ShoePageProps {
    params: Promise<{
      shoe: string[];
    }>;
  }

  
  export default async function ShoePage({ params }: ShoePageProps) {
    // Await the resolved value of params
    const { shoe } = await params;
  
    if (shoe.length === 1) {
      const shoeId = shoe[0];
      return (
        <>
          <TopNavBar />
          <ShoesDetail productId={shoeId} />
          <Footer />
        </>
      );
    } else {
      return <PageNotFound />;
    }
  }