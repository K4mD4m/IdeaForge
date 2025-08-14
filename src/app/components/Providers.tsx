"use client";

import { SessionProvider } from "next-auth/react";
import { Navbar } from "./navbar";
import Footer from "./footer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
      <Footer />
    </SessionProvider>
  );
}
