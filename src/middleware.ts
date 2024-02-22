export { default } from "next-auth/middleware";

// protectes the app routes
export const config = {
  matcher: [
    '/dashboard:path*',      
    
  ],
}