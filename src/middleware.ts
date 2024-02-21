export { default } from "next-auth/middleware";
 
export const config = {
  matcher: [
    '/dashboard:path*',
    '/account-activated:path*',
    '/recover:path*',
    '/reset-password:path*',
  ],
}