
import RacketDetail from "@/app/Components/Rackets/RacketDetail";
import Footer from "@/app/Components/Footer";
import PageNotFound from "@/app/Components/PageNotFound";
import TopNavBar from "@/app/Components/TopNavBar";

interface RacketsProps {
    params: Promise<{
      racket: string[];
    }>;
  }

  
export default async function Rackets({ params }: RacketsProps) {
    // Await the resolved value of params
    const { racket } = await params;
  
    if (racket.length === 1) {
      const racketId = racket[0];
      return (
        <>
          <TopNavBar />
          <RacketDetail productId={racketId} />
          <Footer />
        </>
      );
    } else {
      return <PageNotFound />;
    }
  }