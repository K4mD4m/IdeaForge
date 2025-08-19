"use client";

import { Mail, Github } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white px-6 pt-24 pb-16 flex justify-center">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-400 mb-12">
          Got questions, suggestions, or collaboration ideas? We’d love to hear
          from you.
        </p>

        <div className="flex flex-col gap-6 items-center">
          {/* Email */}
          <Link
            href="mailto:ideaforgesm@gmail.com"
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-xl hover:bg-white/10 transition-colors w-full sm:w-2/3"
          >
            <Mail className="text-purple-400" />
            <span className="text-lg">ideaforgesm@gmail.com</span>
          </Link>

          {/* GitHub */}
          <Link
            href="https://github.com/K4mD4m"
            target="_blank"
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-xl hover:bg-white/10 transition-colors w-full sm:w-2/3"
          >
            <Github className="text-purple-400" />
            <span className="text-lg">github.com/K4mD4m</span>
          </Link>
        </div>

        {/* Decorative section */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-gray-500 text-sm">
            We aim to respond to all inquiries within 48 hours. Thank you for
            being part of the IdeaForge community!
          </p>
        </div>
      </div>
    </main>
  );
}
