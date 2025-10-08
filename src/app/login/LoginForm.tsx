"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Github, Chrome } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/dashboard",
    });

    if (res?.error) {
      setError("Invalid email or password");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white px-4">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="bg-[#1f1f2e]/90 w-full max-w-md p-8 rounded-2xl border border-white/10 shadow-xl space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Welcome Back</h1>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4 font-medium">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-2.5 rounded-lg font-semibold shadow-lg shadow-purple-600/40 cursor-pointer"
        >
          {loading ? "Logging in..." : "Log In"}
        </motion.button>

        <div className="flex items-center gap-3">
          <div className="flex-grow h-px bg-white/10" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-grow h-px bg-white/10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SocialButton
            provider="google"
            icon={<Chrome className="mr-2" />}
            label="Google"
          />
          <SocialButton
            provider="github"
            icon={<Github className="mr-2" />}
            label="GitHub"
          />
        </div>

        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-purple-400 hover:underline">
            Register
          </a>
        </p>
      </motion.form>
    </main>
  );
}

function Input({
  type = "text",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className="w-full bg-[#12121c] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-500"
      {...props}
    />
  );
}

function SocialButton({
  provider,
  icon,
  label,
}: {
  provider: "google" | "github";
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => signIn(provider, { callbackUrl: "/dashboard" })}
      type="button"
      className="flex items-center justify-center bg-[#12121c] border border-white/10 rounded-lg py-2.5 text-sm font-medium hover:bg-[#1f1f2e] transition cursor-pointer"
    >
      {icon} Continue with {label}
    </motion.button>
  );
}
