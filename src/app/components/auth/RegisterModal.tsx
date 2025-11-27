"use client";

import { useState } from "react";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RegisterModal({ open, onClose }: RegisterModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return "Semua field harus diisi.";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return "Format email tidak valid.";
    }

    if (password.length < 6) {
      return "Password minimal 6 karakter.";
    }

    return null;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setError("");
      // bisa juga ganti ke: buka modal login, atau auto-login nanti
      alert(data?.message || "Registrasi berhasil! Silakan login.");
      onClose();
    } else {
      setError(
        data?.error ||
        data?.message ||
        "Registrasi gagal, silakan cek kembali."
      );
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
          Daftar Akun
        </h1>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded p-2 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {/* Nama */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Nama</label>
            <input
              type="text"
              className="border mt-1 w-full p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition text-white p-2 rounded-lg font-semibold shadow-md active:scale-95"
          >
            Daftar
          </button>
        </form>
      </div>

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
