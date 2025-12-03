"use client";

import { useState, useTransition } from "react";
import { loginAction } from "@/services/auth/auth.service";
import { useRouter } from "next/navigation";

// SHADCN COMPONENTS
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "@/components/ui/alert";

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border border-blue-500/20 text-white backdrop-blur-xl shadow-2xl max-w-sm rounded-2xl">

        <DialogHeader className="text-center mb-2">
          <DialogTitle className="text-3xl font-bold text-white tracking-wide">
            Masuk
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Akses akun OHAYŌ dan mulai jelajahi anime favoritmu.
          </DialogDescription>
        </DialogHeader>

        {/* ERROR ALERT */}
        {error && (
          <Alert variant="destructive" className="bg-red-500/20 border-red-500/40 text-red-300">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-4">

          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <Label className="text-gray-300 text-sm">Email</Label>
            <Input
              type="email"
              placeholder="email@example.com"
              value={email}
              disabled={isPending}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/40 border-blue-500/30 text-white placeholder:text-gray-400 focus-visible:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1">
            <Label className="text-gray-300 text-sm">Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              disabled={isPending}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/40 border-blue-500/30 text-white placeholder:text-gray-400 focus-visible:ring-blue-500"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-5 text-base font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95"
          >
            {isPending ? "Memproses..." : "Masuk"}
          </Button>
        </form>

        {/* REGISTER LINK */}
        <p className="text-center mt-4 text-sm text-gray-400">
          Belum punya akun?{" "}
          <button
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="text-blue-400 font-medium hover:underline"
          >
            Daftar
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
