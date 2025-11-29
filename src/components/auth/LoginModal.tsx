"use client";

import { useState, useTransition } from "react";
import { loginAction } from "@/services/auth/auth.action";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

export default function LoginModal({
  open,
  onClose,
  onOpenRegister,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (!open) return null;

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      return "Email dan password tidak boleh kosong.";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return "Format email tidak valid.";
    }
    return null;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErr = validateForm();
    if (validationErr) {
      setError(validationErr);
      return;
    }

    startTransition(async () => {
      const result = await loginAction(email, password);

      if (!result || result.error) {
        setError(result?.error || "Login gagal.");
        return;
      }

      onClose();
      router.push("/anime");
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 w-full max-w-sm shadow-xl border border-blue-200 animate-scaleIn">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Login
        </h1>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded p-2 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="border mt-1 w-full p-2 rounded"
              placeholder="email@example.com"
              value={email}
              disabled={isPending}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              className="border mt-1 w-full p-2 rounded"
              placeholder="••••••••"
              value={password}
              disabled={isPending}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg font-semibold shadow-md active:scale-95 disabled:opacity-50"
          >
            {isPending ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Belum punya akun?{" "}
          <button
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="text-blue-600 font-medium hover:underline"
          >
            Daftar
          </button>
        </p>
      </div>
    </div>
  );
}
