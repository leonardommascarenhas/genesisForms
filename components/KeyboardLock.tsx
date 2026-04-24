"use client";
import { useEffect } from "react";

export function KeyboardLock() {
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const handler = () => {
      const app = document.getElementById("app-container");
      if (app) {
        app.style.height = `${viewport.height}px`;
      }
    };

    viewport.addEventListener("resize", handler);
    viewport.addEventListener("scroll", handler);
    handler();

    return () => {
      viewport.removeEventListener("resize", handler);
      viewport.removeEventListener("scroll", handler);
    };
  }, []);

  return null;
}
