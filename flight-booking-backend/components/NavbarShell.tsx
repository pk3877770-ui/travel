"use client";

import SessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function NavbarShell() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
    </>
  );
}
