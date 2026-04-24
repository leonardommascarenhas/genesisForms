// components/KeyboardLock.tsx
"use client";
import { useEffect } from "react";

export function KeyboardLock() {
  useEffect(() => {
    // Capture height ONCE before keyboard ever appears
    const vh = window.innerHeight;
    document.documentElement.style.setProperty("--app-height", `${vh}px`);
  }, []); // empty deps = runs once, never again

  return null;
}
