"use client";

import {Loading} from '@/app/auth.loading';
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { AuthLoading , Authenticated , ConvexReactClient , Unauthenticated } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import React, { Children, use } from 'react';

interface ConvexClientProviderProps{
    children: React.ReactNode;
};

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = (
    {
        children
    }:ConvexClientProviderProps)=>{
        return (
            <ClerkProvider>
                <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                    <AuthLoading>
                        <Loading />
                    </AuthLoading>
                    <Authenticated>
                        {children}
                    </Authenticated>
                    <Unauthenticated>
                        {children}
                    </Unauthenticated>
                </ConvexProviderWithClerk>
            </ClerkProvider>
        )
    }


