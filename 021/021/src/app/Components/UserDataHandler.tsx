"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function UserDataHandler() {
  const { user, isSignedIn, isLoaded } = useUser();
  const storeUser = useMutation(api.user.store);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Store user data in Convex
      storeUser({
        email: user.primaryEmailAddress?.emailAddress || "",
        userName: user.fullName || "",
        address: "",
        phoneNumber: "",
      });
    }
  }, [isLoaded, isSignedIn, user, storeUser]);

  return null;
} 