import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Create route matchers for different types of routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/Rackets(.*)",
  "/Shoes(.*)",
  "/Accessories(.*)",
  "/AboutUs",
  "/ContactUs",
  "/Brands(.*)",
  "/profile",
]);

const isAdminRoute = createRouteMatcher([
  "/Admin",
  "/Admin/(.*)"  // This will match all admin routes
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes without authentication
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (isAdminRoute(req)) {
    const session = auth().sessionId;
    if (!session) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  return NextResponse.next();
});

// Fixed matcher configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|js|css|mp4)$).*)",
    "/api/(.*)",
  ],
};
