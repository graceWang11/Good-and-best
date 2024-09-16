/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import TopNavBar from "./TopNavBar";
import Footer from "./Footer";
import AboutUs from "./AboutUS";
import BannerCarousel from "./BrandCarousel"
import Banner from "./Banner";
import WhyChooseUs from "./Choose";

export default function ClientComponent() {
  const storeUser = useMutation(api.user.store);

  const testUrl = useQuery(api.imageStorage.getImageUrl, { imageId: "kg26whsnx2wc31779p2m5e7r1x6z8tqf" });

  useEffect(() => {
    storeUser({
      userName: "",
      address: "",
      phoneNumber: "",
      email:""
    });
  });


  return (
    
    <div>
      <TopNavBar />
      <Banner />
      <div style={{ padding: '20px' }}>
        {/* <BestSeller /> */}
        <WhyChooseUs />
        <AboutUs />
        <Footer />
      </div>
    </div>
  );
}
