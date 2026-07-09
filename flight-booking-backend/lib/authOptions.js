import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import bcrypt from "bcryptjs";

/** @type {import("next-auth").NextAuthOptions} */
export const authOptions = {
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET 
      ? [GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })] 
      : []),
    ...(process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET 
      ? [AppleProvider({
          clientId: process.env.APPLE_CLIENT_ID,
          clientSecret: process.env.APPLE_CLIENT_SECRET,
        })] 
      : []),
    ...(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET 
      ? [FacebookProvider({
          clientId: process.env.FACEBOOK_CLIENT_ID,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        })] 
      : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }
        
        const user = await User.findOne({ email: credentials.email }).select("+password");
        
        if (!user) {
          throw new Error("No user found with this email");
        }
        
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        
        if (!isMatch) {
          throw new Error("Invalid password");
        }
        
        // Update last login
        await User.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } });
        
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          mongoId: user._id.toString()
        };
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (["google", "apple", "facebook"].includes(account.provider)) {
        try {
          await dbConnect();

          // Check if user already exists
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create a new user with a random password
            const randomPassword = crypto.randomBytes(32).toString("hex");
            existingUser = await User.create({
              name: user.name || user.email.split('@')[0],
              email: user.email,
              password: randomPassword,
            });
          } else {
            // Update last login
            await User.updateOne({ _id: existingUser._id }, { $set: { lastLogin: new Date() } });
          }

          // Attach the MongoDB user ID to the user object
          user.mongoId = existingUser._id.toString();
          user.role = existingUser.role;
          return true;
        } catch (error) {
          console.error("Social sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // On initial sign-in, persist MongoDB user data into the JWT
      if (user) {
        if (user.mongoId) {
          token.mongoId = user.mongoId;
          token.role = user.role;
        } else if (user.email) {
          try {
            await dbConnect();
            const dbUser = await User.findOne({ email: user.email });
            if (dbUser) {
              token.mongoId = dbUser._id.toString();
              token.role = dbUser.role;
            }
          } catch (e) {
            console.error("JWT DB Fetch Error:", e);
          }
        }
      }

      // Self-heal: If an existing session doesn't have mongoId, fetch it
      if (!token.mongoId && token.email) {
        try {
          await dbConnect();
          const dbUser = await User.findOne({ email: token.email });
          if (dbUser) {
            token.mongoId = dbUser._id.toString();
            token.role = dbUser.role;
          }
        } catch (e) {
          console.error("JWT Session Healing Error:", e);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.mongoId || token.sub;
        session.user.role = token.role;
        // Ensure name and email are preserved if NextAuth didn't automatically
        if (token.name) session.user.name = token.name;
        if (token.email) session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour - effectively prevents long-term persistent sessions
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || "default_secret_key",
};
