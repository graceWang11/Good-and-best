import {
    clerkMiddleware,
    createRouteMatcher,
  } from '@clerk/nextjs/server';
  
  //clerkMiddleware: This is a middleware function provided by Clerk to handle user authentication and session management within a Next.js application.
  //createRouteMatcher: This utility helps create route matchers, which are used to identify specific routes that should be protected or handled differently.
  const isProtectedRoute = createRouteMatcher(['/(.*)']);
  //isProtectedRoute: A variable that holds the result of createRouteMatcher. The pattern '/(.*)' is a regular expression that matches all routes. This means every route in the application is considered "protected."
  
  export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  });
  //clerkMiddleware: The main middleware function that runs for each request.
  //(auth, req): The function takes two arguments, auth and req (the request object).
  //if (isProtectedRoute(req)): Checks if the current request URL matches the protected route pattern.
  //auth().protect(): If the route is protected, this function enforces authentication, redirecting unauthenticated users to the sign-in page.

  export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!clientComponent|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  };
  //config.matcher: Specifies the routes that the middleware should apply to.
  //First Pattern: '/((?!_next|[^?]*\\.(?:...)).*)' excludes internal Next.js paths and static files (like images, CSS, JavaScript, etc.) from being processed by the middleware.
  //Second Pattern: '/((?!_next|[^?]*\\.(?:...)).*)' ensures that API routes and other specified paths are always handled by the middleware