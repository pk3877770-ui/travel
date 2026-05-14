import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth",
  },
});

export const config = {
  // Protect all routes except the auth page, NextAuth API, static files, and public assets
  matcher: [
    "/((?!auth|api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|css|js)).*)",
  ],
};
