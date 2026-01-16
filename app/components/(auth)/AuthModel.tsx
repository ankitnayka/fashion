"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAuthModal } from "@/hooks/useAuthModal";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthModal() {
  const { isOpen, closeModal } = useAuthModal();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        mode === "login"
          ? "/api/auth/login"
          : "/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            mode === "login"
              ? { email, password }
              : { name, email, password }
          ),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      // ✅ success
      closeModal();
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Server error, try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6">
        {/* Close */}
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="mb-4 text-center text-xl font-semibold">
          {mode === "login"
            ? "Login to Mahii Fashion"
            : "Create Account"}
        </h2>

        {/* Error */}
        {error && (
          <p className="mb-3 rounded bg-red-100 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
            required
          />

          <button
            disabled={loading}
            className="w-full rounded-md bg-black py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        {/* Switch */}
        <p className="mt-4 text-center text-sm text-gray-600">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="font-medium text-black underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-medium text-black underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
