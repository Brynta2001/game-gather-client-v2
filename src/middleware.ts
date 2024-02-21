export { default } from "next-auth/middleware";
 
export const config = {
  matcher: [
    '/dashboard:path*',
    '/account-activated:path*',
    '/reset-password:path*',
  ],
}