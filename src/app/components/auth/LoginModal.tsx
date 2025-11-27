"use client";

import { useState } from "react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onOpenRegister: () => void; 
}

export default function LoginModal({ open, onClose, onOpenRegister }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/anime";
    } else {
      const result = await res.json();
      setError(result?.error || "Login gagal, silakan cek kembali.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">

      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 w-full max-w-sm shadow-xl border border-blue-200 animate-scaleIn">

        {/* Close Button */}
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition"
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

          {/* Email */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="border mt-1 w-full p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="border mt-1 w-full p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition text-white p-2 rounded-lg font-semibold shadow-md active:scale-95"
          >
            Masuk
          </button>
        </form>

        {/* Register Trigger */}
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

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
