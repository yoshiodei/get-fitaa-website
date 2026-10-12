"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Shows a small confirmation message in the bottom-right corner for 3 seconds. */
export function useToast() {
  const [msg, setMsg] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const show = useCallback((m: string) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(""), 3000);
  }, []);

  const toast = msg ? (
    <div role="status" aria-live="polite" className="fixed bottom-5 right-5 z-[120] rounded-lg bg-[#0B3D22] px-5 py-3 text-sm font-semibold text-white shadow-xl">
      {msg}
    </div>
  ) : null;

  return { toast, show };
}