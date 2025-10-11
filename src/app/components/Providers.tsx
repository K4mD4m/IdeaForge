"use client";

import { SessionProvider } from "next-auth/react";
import { Navbar } from "./navbar";
import Footer from "./footer";

// Wraps the app with session, navbar, and footer
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
      <Footer />
    </SessionProvider>
  );
}
