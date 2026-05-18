import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || "default_secret_key",
});

export const config = {
  // Protect specific routes that require authentication
  matcher: [
    "/profile/:path*",
    "/admin/:path*",
  ],
};
