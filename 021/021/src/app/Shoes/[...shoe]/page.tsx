"use client";
import ShoeDetail from "@/app/Components/Shoes/ShoesDetail";
import Footer from "@/app/Components/Footer";
import PageNotFound from "@/app/Components/PageNotFound";
import TopNavBar from "@/app/Components/TopNavBar";

export default function Shoes({ params }: { params: { shoe: string[] } }) {
    if(params.shoe.length === 1){
        const shoeId = params.shoe[0];
        return (
            <>
                <TopNavBar />
                <ShoeDetail productId={shoeId} />
                <Footer />
            </>
        );
    }else{
        return <PageNotFound />
    }
} 