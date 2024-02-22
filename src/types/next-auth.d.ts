import NextAuth from "next-auth";

// Extend the default session with custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      fullName: string;
      isActive: boolean;
      token: string;
    };
  }
}
