import {
    clerkMiddleware,
    createRouteMatcher,
  } from '@clerk/nextjs/server';
  
  export default clerkMiddleware((auth, req) => {
    // Apply authentication protection to all routes except for '/clientComponent'
    if (req.nextUrl.pathname !== '/clientComponent') {
      auth().protect();
    }
  });

  //auth().protect(): If the route is protected, this function enforces authentication, redirecting unauthenticated users to the sign-in page.

  export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|clientComponent|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  };
  //config.matcher: Specifies the routes that the middleware should apply to.
  //First Pattern: '/((?!_next|[^?]*\\.(?:...)).*)' excludes internal Next.js paths and static files (like images, CSS, JavaScript, etc.) from being processed by the middleware.
  //Second Pattern: '/((?!_next|[^?]*\\.(?:...)).*)' ensures that API routes and other specified paths are always handled by the middleware