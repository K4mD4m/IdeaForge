"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#111122] to-[#1a1a2e] text-gray-200 px-6 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl z-10"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="mx-auto mb-6 w-24 h-24 flex items-center justify-center cursor-pointer"
        >
          <motion.div
            animate={{
              color: ["#9f7aea", "#ffffff", "#9f7aea"],
              filter: [
                "drop-shadow(0 0 0px #fff)",
                "drop-shadow(0 0 15px #fff)",
                "drop-shadow(0 0 0px #fff)",
              ],
            }}
            transition={{ repeat: Infinity, repeatDelay: 1.5, duration: 1 }}
            className="w-full h-full"
          >
            <Lightbulb className="w-full h-full" />
          </motion.div>
        </motion.div>

        <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Idea Not Found!</h2>
        <p className="text-gray-400 mb-8">
          Looks like your idea got lost in the forge. Don’t worry, it happens to
          the best of us.
        </p>
        <Link href="/">
          <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-lg">
            Back to Safety
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}
