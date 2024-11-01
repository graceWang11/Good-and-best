"use client";

import { useUser } from "@clerk/clerk-react";
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
        userName: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        address: "", // Can be updated later in profile
        phoneNumber: user.phoneNumbers?.[0]?.phoneNumber || "",
      });
    }
  }, [isLoaded, isSignedIn, user, storeUser]);

  return null; // This component doesn't render anything
} 