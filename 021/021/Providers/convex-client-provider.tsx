"use client";

import { Loading } from '@/app/auth.loading';
import { useAuth } from '@clerk/nextjs';
import { 
  AuthLoading, 
  Authenticated, 
  ConvexReactClient, 
  Unauthenticated 
} from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ReactNode } from "react";

interface ConvexClientProviderProps {
  children: ReactNode;
  unauthenticatedChildren?: ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

export default function ConvexClientProvider({
  children,
  unauthenticatedChildren
}: ConvexClientProviderProps) {
  return (
    <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      <AuthLoading>
        <Loading />
      </AuthLoading>
      <Authenticated>
        {children}
      </Authenticated>
      <Unauthenticated>
        {unauthenticatedChildren || children}
      </Unauthenticated>
    </ConvexProviderWithClerk>
  );
}


