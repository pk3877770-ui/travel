import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          await dbConnect();

          // Check if user already exists
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create a new user with a random password (they'll use Google to sign in)
            const randomPassword = crypto.randomBytes(32).toString("hex");
            existingUser = await User.create({
              name: user.name,
              email: user.email,
              password: randomPassword,
            });
          } else {
            // Update last login
            existingUser.lastLogin = new Date();
            await existingUser.save();
          }

          // Attach the MongoDB user ID to the user object
          user.mongoId = existingUser._id.toString();
          user.role = existingUser.role;
          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // On initial sign-in, persist MongoDB user data into the JWT
      if (user) {
        token.mongoId = user.mongoId;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose MongoDB user fields on the session
      session.user.id = token.mongoId;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || "default_secret_key",
});

export { handler as GET, handler as POST };
