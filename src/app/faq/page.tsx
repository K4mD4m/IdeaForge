"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

type FAQItem = {
    question: string;
    answer: string;
};

const faqData: FAQItem[] = [
    {
        question: "What is IdeaForge?",
        answer:
            "IdeaForge is a platform where you can share your ideas, browse others projects, and get inspired. It's designed to help you connect, explore, and grow your creativity.",
    },
    {
        question: "Do I need an account to use IdeaForge?",
        answer:
            "You can browse public ideas without an account, but you'll need to sign up to create, save, or interact with ideas.",
    },
    {
        question: "Can I edit or delete my ideas?",
        answer:
            "Yes. On your personal dashboard, you can manage your own ideas — edit, delete, or keep them as drafts until you’re ready to publish.",
    },
    {
        question: "What’s the difference between Draft and Published?",
        answer:
            "Drafts are visible only to you in your dashboard, while Published ideas appear on the public wall where others can see and interact with them.",
    },
    {
        question: "Is IdeaForge free to use?",
        answer:
            "Yes. The core features of IdeaForge are completely free. Future premium features may be introduced to support advanced users.",
    },
    {
        question: "How can I contact support?",
        answer:
            "You can reach us anytime at ideaforgesm@gmail.com or visit the Contact page for more details.",
    },
];

export default function FAQPage() {
    return (
        <main className="min-h-screen min-w-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white px-6 pt-24 pb-16 max-w-3xl mx-auto">
            <motion.h1
                className="text-4xl font-extrabold mb-10 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Frequently Asked Questions
            </motion.h1>

            <div className="space-y-4">
                {faqData.map((item, idx) => (
                    <FAQCard key={idx} {...item} />
                ))}
            </div>

            {/* CTA Box */}
            <motion.div
                className="mt-12 p-6 rounded-xl border border-white/10 bg-[#1f1f2e]/80 shadow-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
                <p className="text-gray-400 mb-4">
                    Can’t find the answer you’re looking for? We’re here to help.
                </p>
                <Link
                    href="/contact"
                    className="inline-block px-6 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
                >
                    Contact Us
                </Link>
            </motion.div>
        </main>
    );
}

function FAQCard({ question, answer }: FAQItem) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            className="bg-[#1f1f2e]/80 rounded-xl border border-white/10 shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <button
                className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-semibold hover:bg-white/5 transition-colors"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <span>{question}</span>
                <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 300, opacity: 1 }}
                        exit={{ maxHeight: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-4 text-gray-300 text-base leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
