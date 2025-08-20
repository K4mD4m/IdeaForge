"use client";

import { motion } from "framer-motion";

const changelog = [
  {
    version: "v1.0.0",
    date: "2025-08-15",
    title: "MVP Launch",
    description:
      "Initial release of IdeaForge with user accounts, idea sharing wall, and basic UI.",
    highlights: [
      "User authentication",
      "Idea posting",
      "Basic homepage & dashboard",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <section className="px-6 py-20 bg-gradient-to-r from-[#161622] to-[#1d1d35] text-white min-h-screen">
      <div className="max-w-4xl mt-5 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Changelog</h1>
          <p className="text-gray-400">
            Stay up to date with the latest changes and improvements.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l border-gray-700/50 pl-8 space-y-12">
          {changelog.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Circle */}
              <div className="absolute -left-[34px] top-2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"></div>

              {/* Content */}
              <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-md hover:scale-[1.02] transition-transform">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h2 className="text-xl font-semibold">{entry.title}</h2>
                  <span className="text-sm text-gray-400 mt-1 md:mt-0">
                    {entry.date} • {entry.version}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{entry.description}</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
                  {entry.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
