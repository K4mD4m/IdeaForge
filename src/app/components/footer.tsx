"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-[#0a0a0f] to-[#141428] text-white border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                {/* Top */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand / Blurb */}
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 group"
                            aria-label="Go to homepage"
                        >
                            <span className="h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_24px_theme(colors.purple.500/60%)] group-hover:scale-110 transition-transform" />
                            <span className="text-2xl font-bold tracking-tight">
                                Idea<span className="text-purple-400">Forge</span>
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
                            A clean space to share, refine, and launch ideas. Discover what
                            others are building and get inspired.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-gray-300">
                            Product
                        </h4>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li><FooterLink href="/ideas">Ideas Wall</FooterLink></li>
                            <li><FooterLink href="/dashboard">My Dashboard</FooterLink></li>
                            <li><FooterLink href="/changelog">Changelog</FooterLink></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-gray-300">
                            Resources
                        </h4>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li><FooterLink href="/faq">FAQ</FooterLink></li>
                            <li><FooterLink href="/contact">Contact</FooterLink></li>
                            <li><FooterLink href="/community">Community</FooterLink></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-gray-300">
                            Stay in the loop
                        </h4>
                        <p className="mt-4 text-sm text-gray-400">
                            Join our newsletter to get updates and highlights.
                        </p>
                        <form
                            className="mt-4 flex gap-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                // todo: newsletter integration
                            }}
                        >
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                aria-label="Email address"
                                className="bg-[#1b1b26] border-white/10 text-white placeholder:text-gray-500"
                                required
                            />
                            <Button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-500"
                            >
                                Subscribe
                            </Button>
                        </form>
                        <p className="mt-2 text-[11px] text-gray-500">
                            By subscribing you agree to our{" "}
                            <FooterLink href="/terms">Terms</FooterLink> and{" "}
                            <FooterLink href="/privacy">Privacy Policy</FooterLink>.
                        </p>
                    </div>
                </div>

                <Separator className="my-8 bg-white/10" />

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-gray-400">
                        © {new Date().getFullYear()} IdeaForge. All rights reserved.
                    </div>

                    <div className="flex items-center gap-6">
                        <FooterLink href="/terms">Terms</FooterLink>
                        <FooterLink href="/privacy">Privacy</FooterLink>
                        <div className="h-4 w-px bg-white/10" aria-hidden="true" />
                        <div className="flex items-center gap-3">
                            <IconLink href="https://github.com" label="GitHub">
                                <Github className="h-4 w-4" />
                            </IconLink>
                            <IconLink href="https://twitter.com" label="Twitter / X">
                                <Twitter className="h-4 w-4" />
                            </IconLink>
                            <IconLink href="https://linkedin.com" label="LinkedIn">
                                <Linkedin className="h-4 w-4" />
                            </IconLink>
                            <IconLink href="mailto:hello@ideaforge.app" label="Email">
                                <Mail className="h-4 w-4" />
                            </IconLink>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    const isExternal = href.startsWith("http");
    const base =
        "text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1";
    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={base}
            >
                {children}
                <span className="sr-only">(opens in a new tab)</span>
            </a>
        );
    }
    return (
        <Link href={href} className={base}>
            {children}
        </Link>
    );
}

function IconLink({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    const isExternal = href.startsWith("http");
    const cls =
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#1b1b26] hover:border-purple-500/60 hover:bg-purple-600/20 hover:shadow-[0_0_24px_theme(colors.purple.500/40%)] transition-all";
    if (isExternal) {
        return (
            <a
                href={href}
                className={cls}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
            >
                {children}
            </a>
        );
    }
    return (
        <Link href={href} className={cls} aria-label={label} title={label}>
            {children}
        </Link>
    );
}
