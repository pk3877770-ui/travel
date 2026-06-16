"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

export default function TabSessionGuard() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const isTabActive = sessionStorage.getItem("tab_session_active");
      
      if (!isTabActive) {
        // This tab doesn't have the active session flag.
        // It means the user opened a new tab or window.
        // We log them out of the entire session and redirect to the auth page.
        signOut({ redirect: true, callbackUrl: "/auth" });
      }
    } else if (status === "unauthenticated") {
      // Mark this tab as ready to accept a new login session
      sessionStorage.setItem("tab_session_active", "true");
    }
  }, [status]);

  return null;
}
