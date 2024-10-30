"use client";

import React from 'react';
import ShoesDetail from "@/app/Components/Shoes/ShoesDetail";
import TopNavBar from "@/app/Components/TopNavBar";
import Footer from "@/app/Components/Footer";
import PageNotFound from "@/app/Components/PageNotFound";

export default function ShoePage({ params }: { params: { shoe: string[] } }) {
    if(params.shoe.length === 1){
        const shoeId = params.shoe[0];
        return (
            <>
                <TopNavBar />
                <ShoesDetail productId={shoeId} />
                <Footer />
            </>
        );
    }else{
        return <PageNotFound />
    }
} 