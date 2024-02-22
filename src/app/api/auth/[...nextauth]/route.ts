// Import axiosInstance from the axios-instance module
// FILEPATH: /c:/Users/emili/Desktop/WebAvanzadas/ProyectoWebAvanzadas/game-gather-client-v2/src/app/api/auth/[...nextauth]/route.ts
import { axiosInstance } from "@/lib/axios-instance";

// Import necessary modules and types
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// Define authentication options
const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    // Use the CredentialsProvider for authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@email.com" },
        password: { label: "Password", type: "password" },
      },
      // Authorize the user by sending a POST request to the login endpoint
      async authorize(credentials, req) {

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
        
        // If there is an error, throw an error and log the error message
        if (user.error){
          console.log(user.error)
          throw new Error(user.error)
        }
        return user;
      }
    }),
  ],
  callbacks: {
    // Update the JWT token with user data
    async jwt({token, user}) {
      return {
        ...token,
        ...user
      }
    },
    // Update the session with the token
    async session({session, token}) {
      session.user = token as any;
      return session;
    },
  }
}

// Create the NextAuth handler with the defined options
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }