import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Create the next-auth middleware instance
const authMiddleware = withAuth({
  pages: {
    signIn: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || "default_secret_key",
});

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  
  // Custom Admin Route Protection
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_session_token");
    const isAuth = token?.value === "authenticated";
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
      // Allow access to the login page regardless of authentication status
      const response = NextResponse.next();
      
      // If they explicitly navigate to the login page, destroy their current session
      // to force them to re-authenticate (only on GET to avoid breaking form POSTs)
      if (req.method === "GET") {
        response.cookies.delete("admin_session_token");
      }
      
      return response;
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  // Delegate /profile to next-auth
  if (pathname.startsWith("/profile")) {
    return (authMiddleware as any)(req, {} as any);
  }

  return NextResponse.next();
}

export const config = {
  // Protect specific routes that require authentication
  matcher: [
    "/profile/:path*",
    "/admin/:path*",
  ],
};
