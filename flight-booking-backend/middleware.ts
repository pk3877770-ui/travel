import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname;
    
    if (pathname.startsWith("/admin")) {
      const token = req.cookies.get("admin_token");
      const isAuth = token?.value === "authenticated";
      const isLoginPage = pathname === "/admin/login";

      if (isLoginPage) {
        if (isAuth) {
          // If already authenticated, redirect to the admin dashboard/leads
          return NextResponse.redirect(new URL("/admin/leads", req.url));
        }
        return NextResponse.next();
      }

      if (!isAuth) {
        // If not authenticated and trying to access an admin page, redirect to login
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // We handle /admin routes entirely within the middleware function above, so authorize them to pass through
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return true;
        }
        // For other protected routes (like /profile), require a NextAuth token
        return !!token;
      },
    },
    pages: {
      signIn: "/auth",
    },
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || "default_secret_key",
  }
);

export const config = {
  // Protect specific routes that require authentication
  matcher: [
    "/profile/:path*",
    "/admin/:path*",
  ],
};
