"use client";
import AccessoriesDetail from "@/app/Components/Accessories/AccessoriesDetail";
import Footer from "@/app/Components/Footer";
import PageNotFound from "@/app/Components/PageNotFound";
import TopNavBar from "@/app/Components/TopNavBar";

export default function Accessories({ params }: { params: { accessory: string[] } }) {

     // Safely access and trim the first element
    if(params.accessory.length ===1){
        const accessoryId = params.accessory[0];
        return (
            <>
                <TopNavBar />
                <AccessoriesDetail productId={accessoryId} />
                <Footer />
            </>
        );
    }else{
        return <PageNotFound />
    }
}
