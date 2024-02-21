import { axiosInstance } from "@/lib/axios-instance";
import { backendUrl } from "@/lib/constants";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // const res = await fetch(backendUrl + "/auth/login", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         email: credentials?.email,
        //         password: credentials?.password
        //     }),
        // });

        const res = await axiosInstance.post("/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
        }, 
          {
            headers: {
              "Content-Type": "application/json"
            }
        });
        
        const user = await res.data;
        
        if (user.error){
          console.log(user.error)
          throw new Error(user.error)
        }
        return user;
      }
    }),
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
export { handler as GET, handler as POST }