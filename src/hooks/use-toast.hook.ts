"use client";

import { useState, useCallback } from "react";

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2000);
  }, []);

  const Toast = () =>
    message ? (
      <div className="fixed top-5 right-5 bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn">
        {message}
      </div>
    ) : null;

  return { show, Toast };
}
