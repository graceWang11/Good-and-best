import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware((auth, req) => {
  // Apply authentication protection to all routes except for '/clientComponent'
  if (req.nextUrl.pathname !== '/clientComponent') {
    auth().protect(); // Redirect to sign-in page if not authenticated
  }
  // No authentication is enforced on /clientComponent, so no additional logic is needed
});

export const config = {
  matcher: [
    // Apply middleware to all routes except internal Next.js paths, static files, and /clientComponent
    '/((?!_next|clientComponent|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
