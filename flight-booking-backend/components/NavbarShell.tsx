"use client";

import SessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";

export default function NavbarShell() {
  return (
    <SessionProvider>
      <Navbar />
    </SessionProvider>
  );
}
