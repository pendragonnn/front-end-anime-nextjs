"use client";

import { useState } from "react";
import { logoutAction } from "@/services/auth/auth.service";
import { Button } from "@/components/ui/button";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import Link from "next/link";

export default function HeaderClient({ loggedIn }: { loggedIn: boolean }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAction();
    window.location.href = "/";
  };

  return (
    <>
      {/* ---------------- HEADER ---------------- */}
      <header className="sticky top-0 z-50 bg-black text-white ">
        <div className="h-18 flex items-center justify-between px-6">
          {/* Left spacer */}
          <div className="w-20"></div>

          {/* CENTER TITLE */}
          <h1 className="text-3xl font-bold tracking-widest select-none">
            OHAYŌ
          </h1>

          {/* RIGHT ACTIONS */}
          <div className="w-20 gap-4 flex justify-end">
            {loggedIn ? (
              <>
                <Button variant="ghost" size="sm">
                  <Link href={"/chat"}>Forum</Link>
                </Button>
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/10 text-white hover:bg-white/20"
                onClick={() => setLoginOpen(true)}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* ---------------- MODALS ---------------- */}
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onOpenRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />

      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onOpenLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />
    </>
  );
}
