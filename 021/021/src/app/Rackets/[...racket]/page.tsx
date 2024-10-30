"use client";
import RacketDetail from "@/app/Components/Rackets/RacketDetail";
import Footer from "@/app/Components/Footer";
import PageNotFound from "@/app/Components/PageNotFound";
import TopNavBar from "@/app/Components/TopNavBar";

export default function Rackets({ params }: { params: { racket: string[] } }) {
    if(params.racket.length === 1){
        const racketId = params.racket[0];
        return (
            <>
                <TopNavBar />
                <RacketDetail productId={racketId} />
                <Footer />
            </>
        );
    }else{
        return <PageNotFound />
    }
} 