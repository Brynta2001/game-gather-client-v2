import { backendUrl } from "@/lib/constants";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "example@email.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const res = await fetch(backendUrl + "/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: credentials?.email,
                    password: credentials?.password
                }),
            });

            const user = res.json();
      
            if (user) {
              return user
            } else {
              return null
            }
            
          }
        })
      ],
      callbacks: {
        async jwt({token, user}) {
          return {
            ...token,
            ...user
          }
        },
        async session({session, token}) {
          session.user = token as any;
          return session;
        },
      }
}

const handler = NextAuth(authOptions);
export default handler;
//export { handler as GET, handler as POST }