"use client";
import Image from "next/image";
import ClientComponent from "./Components/ClientComponent";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {

  // const storeUser = useMutation(api.user.store);
  
  // useEffect(() => {
  //   storeUser({});
  // });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ClientComponent />
    </main>
  );
}
