"use client";

import { motion } from "framer-motion";

export default function CommunityPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0f] via-[#111122] to-[#1a1a2e] text-gray-200 px-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex flex-col items-center justify-center text-center"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 bg-clip-text text-transparent">
                    Community
                </h1>
                <p className="text-lg md:text-xl text-gray-400 mb-8">
                    This feature is coming soon.<br />
                    Stay tuned for the next update!
                </p>
                <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg animate-pulse">
                    🚧 In the next update 🚧
                </span>
            </motion.div>
        </main>
    );
}