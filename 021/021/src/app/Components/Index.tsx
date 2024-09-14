/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import TopNavBar from "./TopNavBar";
import BannerComponent from "./BannerComponent";
import BestSeller from "./BestSeller";
import AboutUS from "./AboutUS"
import Footer from "./Footer";

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
      <BannerComponent />
      <div style={{ padding: '20px' }}>
        <BestSeller />
        <AboutUS />
        <Footer />
      </div>
    </div>
  );
}
