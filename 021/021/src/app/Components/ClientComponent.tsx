/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

export default function ClientComponent() {
  const storeUser = useMutation(api.user.store);
  const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId: "kg21130dyzb8e9sh31t51ptynh6z9xz2" });

  useEffect(() => {
    storeUser({
      userName: "",
      address: "",
      phoneNumber: ""
    });
  });

  
  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Main Page</h1>
      <img src={imageUrl} alt="Main Image" />
    </div>
  );
  
}
