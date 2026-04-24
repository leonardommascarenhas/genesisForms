// components/KeyboardLock.tsx
"use client";
import { useEffect } from "react";

export function KeyboardLock() {
  useEffect(() => {
    const lock = () => {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    };
    const unlock = () => {
      document.body.style.position = "";
      document.body.style.width = "";
    };

    document.addEventListener("focusin", lock);
    document.addEventListener("focusout", unlock);
    return () => {
      document.removeEventListener("focusin", lock);
      document.removeEventListener("focusout", unlock);
    };
  }, []);

  return null;
}
