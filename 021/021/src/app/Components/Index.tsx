/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import TopNavBar from "../Components/TopNavBar";
import Footer from "../Components/Footer";
import AboutUs from "../Components/Index/AboutUS";
import Banner from "../Components/Index/Banner";
import WhyChooseUs from "../Components/Index/Choose";
import ShopBadmintonAccessories from "../Components/Index/Accesoniries";


export default function ClientComponent() {
  const storeUser = useMutation(api.user.store);

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
        <ShopBadmintonAccessories />
        <WhyChooseUs />
        <AboutUs />
        <Footer />
      </div>
    </div>
  );
}

