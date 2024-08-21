
"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";


export default function ClientComponent() {
  const storeUser = useMutation(api.user.store);

  useEffect(() => {
    storeUser({});
  });

  return <div>good and best !</div>;
}
