"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-cyber text-2xl font-bold tracking-wider neon-text-cyan">
            SYSTEM://LOGIN
          </h1>
          <p className="mt-2 font-cyber text-[10px] uppercase tracking-[0.3em] text-neutral-600">
            Access Dashboard Terminal
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 border border-white/5 bg-white/[0.02] p-8"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
          }}
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-red-500/30 bg-red-500/5 p-3 text-center font-cyber text-xs text-red-400"
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="mb-2 block font-cyber text-[10px] uppercase tracking-wider text-neutral-500">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white outline-none transition-colors focus:border-cyber-cyan/40 focus:bg-white/[0.05]"
              placeholder="admin@jrprod.com"
            />
          </div>

          <div>
            <label className="mb-2 block font-cyber text-[10px] uppercase tracking-wider text-neutral-500">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white outline-none transition-colors focus:border-cyber-cyan/40 focus:bg-white/[0.05]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full border border-cyber-cyan/30 bg-cyber-cyan/5 py-3 font-cyber text-xs font-bold uppercase tracking-wider text-cyber-cyan transition-all duration-300 hover:border-cyber-cyan/60 hover:bg-cyber-cyan/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] disabled:opacity-50"
            style={{
              clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
            }}
          >
            {loading ? "AUTHENTICATING..." : "ACCESS TERMINAL"}
          </button>
        </form>

        {/* Decorative corners */}
        <div className="mt-6 text-center">
          <span className="font-cyber text-[9px] tracking-wider text-neutral-700">
            JR://PROD DASHBOARD
          </span>
        </div>
      </motion.div>
    </div>
  );
}
