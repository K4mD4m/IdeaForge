"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white px-6 pt-24 pb-16 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="text-gray-400 mb-6 text-center">
          Last updated: 14.08.2025
        </p>

        <section className="space-y-8 text-gray-300 leading-relaxed">
          <p>
            This Privacy Policy explains how <strong>IdeaForge</strong>{" "}
            collects, uses, and protects your personal information. By creating
            an account or using our services, you agree to this Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <p>
            We collect information you provide when creating an account, such as
            your name, email address, and any content you post. We also collect
            technical data such as IP address and browser type for security and
            analytics purposes.
          </p>

          <h2 className="text-2xl font-semibold">
            2. How We Use Your Information
          </h2>
          <p>
            We use your data to operate the platform, provide customer support,
            personalize your experience, and improve our services.
          </p>

          <h2 className="text-2xl font-semibold">3. Sharing of Data</h2>
          <p>
            We do not sell your personal data. We only share it with trusted
            partners necessary to operate the platform, or if required by law.
          </p>

          <h2 className="text-2xl font-semibold">4. Data Security</h2>
          <p>
            We use reasonable technical and organizational measures to protect
            your data, but we cannot guarantee complete security against all
            threats.
          </p>

          <h2 className="text-2xl font-semibold">5. Cookies</h2>
          <p>
            We use cookies to store preferences, enable core functionality, and
            analyze usage. You can disable cookies in your browser settings, but
            this may affect the platform's functionality.
          </p>

          <h2 className="text-2xl font-semibold">6. Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your personal
            data by contacting us.
          </p>

          <h2 className="text-2xl font-semibold">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy at any time. Continued use of the
            platform means you accept the updated policy.
          </p>

          <p className="mt-8">
            If you have privacy concerns, please{" "}
            <Link href="/contact" className="text-purple-400 hover:underline">
              contact us
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
