"use client";

import { useState, useTransition } from "react";
import { registerAction } from "@/services/auth/auth.service";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onOpenLogin?: () => void;
}

export default function RegisterModal({ open, onClose, onOpenLogin }: RegisterModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!open) return null;

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return "Semua field harus diisi.";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) return "Format email tidak valid.";

    if (password.length < 6) return "Password minimal 6 karakter.";

    return null;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErr = validateForm();
    if (validationErr) {
      setError(validationErr);
      return;
    }

    startTransition(async () => {
      const result = await registerAction(name, email, password);

      if (result?.error) {
        setError(result.error);
        return;
      }

      alert("Registrasi berhasil!");
      onClose();
      onOpenLogin?.(); // opsional: buka modal login setelah daftar
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
          Daftar Akun
        </h1>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded p-2 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-700 font-medium">Nama</label>
            <input
              type="text"
              className="border mt-1 w-full p-2 rounded"
              value={name}
              disabled={isPending}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="border mt-1 w-full p-2 rounded"
              value={email}
              disabled={isPending}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="border mt-1 w-full p-2 rounded"
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
            {isPending ? "Memproses..." : "Daftar"}
          </button>
        </form>
      </div>
    </div>
  );
}
