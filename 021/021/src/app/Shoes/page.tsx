"use client"

import React from 'react';
import ShopShoes from "../Components/Shoes/ShopShoes";
import TopNavBar from "../Components/TopNavBar";
import Footer from "../Components/Footer";

export default function ShoesPage() {
  return (
    <>
      <TopNavBar />
      <ShopShoes />
      <Footer />
    </>
  );
}