"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { Mail, Lock, User, Github, Chrome } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error
  const [loading, setLoading] = useState(false); // State for loading

  // Router for navigation
  const router = useRouter();

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Send registration request
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      // Check response
      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#1f1f2e]/90 border border-white/10 rounded-2xl shadow-xl p-8 backdrop-blur-md"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Create an Account
        </h1>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4 font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={<User className="w-5 h-5 text-gray-400" />}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={<Mail className="w-5 h-5 text-gray-400" />}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-2.5 rounded-lg font-semibold shadow-lg shadow-purple-600/40 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <hr className="flex-grow border-gray-700" />
          <span className="text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        <div className="flex flex-col gap-3">
          <SocialButton
            onClick={() => signIn("google")}
            icon={<Chrome className="w-5 h-5" />}
            text="Continue with Google"
            color="bg-gray-800 hover:bg-gray-900 cursor-pointer"
          />
          <SocialButton
            onClick={() => signIn("github")}
            icon={<Github className="w-5 h-5" />}
            text="Continue with GitHub"
            color="bg-gray-800 hover:bg-gray-900 cursor-pointer"
          />
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </main>
  );
}

// Input component for form fields
function Input({
  icon,
  type = "text",
  ...props
}: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center">
        {icon}
      </span>
      <input
        type={type}
        className="w-full bg-[#12121c] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
        {...props}
      />
    </div>
  );
}

// Social button component for third-party login
function SocialButton({
  onClick,
  icon,
  text,
  color,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-3 py-2.5 text-white rounded-lg font-medium shadow-md transition ${color}`}
    >
      {icon}
      {text}
    </button>
  );
}
