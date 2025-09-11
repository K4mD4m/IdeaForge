"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuLinks = [
    { href: "/", label: "Home" },
    { href: "/ideas", label: "Explore Ideas" },
    ...(session ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0a0a0f]/80 backdrop-blur-md border-b border-gray-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center overflow-x-hidden">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          IdeaForge
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
          {!session ? (
            <Button
              className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:opacity-90 transition cursor-pointer"
              onClick={() => signIn()}
            >
              Login
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </Button>
          )}
        </div>

        {/* Mobile Burger */}
        <div className="md:hidden">
          <button
            className="text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0f0f17] border-t border-gray-800"
          >
            <div className="flex flex-col px-4 py-4 space-y-4">
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {!session ? (
                <Button
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:opacity-90 transition"
                  onClick={() => {
                    signIn();
                    setMobileOpen(false);
                  }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white transition"
                  onClick={() => {
                    signOut();
                    setMobileOpen(false);
                  }}
                >
                  Logout
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
