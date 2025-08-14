"use client";

import Link from "next/link";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white px-6 pt-24 pb-16 flex justify-center">
            <div className="w-full max-w-3xl">
                <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>
                <p className="text-gray-400 mb-6 text-center">
                    Last updated: 14.08.2025
                </p>

                <section className="space-y-8 text-gray-300 leading-relaxed">
                    <p>
                        Welcome to <strong>IdeaForge</strong>. By creating an account, using our platform,
                        or accessing any part of our services, you agree to these Terms of Service.
                        If you do not agree, please do not use IdeaForge.
                    </p>

                    <h2 className="text-2xl font-semibold">1. Account Registration</h2>
                    <p>
                        You must provide accurate and complete information when creating an account.
                        By registering, you confirm that you are at least 16 years old and that you have
                        read and accepted these Terms.
                    </p>

                    <h2 className="text-2xl font-semibold">2. Use of the Platform</h2>
                    <p>
                        You agree to use IdeaForge only for lawful purposes. You may not upload, post,
                        or share content that is illegal, harmful, threatening, abusive, defamatory,
                        or infringes on intellectual property rights.
                    </p>

                    <h2 className="text-2xl font-semibold">3. Content Ownership</h2>
                    <p>
                        You retain ownership of the content you post. However, by posting on IdeaForge,
                        you grant us a non-exclusive, worldwide, royalty-free license to display, distribute,
                        and promote your content as part of the service.
                    </p>

                    <h2 className="text-2xl font-semibold">4. Disclaimer & Limitation of Liability</h2>
                    <p>
                        IdeaForge is provided "as is" without any warranties. We are not responsible for
                        any damages arising from the use of our services, including loss of data or content.
                    </p>

                    <h2 className="text-2xl font-semibold">5. Changes to the Terms</h2>
                    <p>
                        We may update these Terms from time to time. Continued use of the platform after
                        such changes means you accept the updated Terms.
                    </p>

                    <p className="mt-8">
                        If you have questions about these Terms, please{" "}
                        <Link href="/contact" className="text-purple-400 hover:underline">
                            contact us
                        </Link>.
                    </p>
                </section>
            </div>
        </main>
    );
}

