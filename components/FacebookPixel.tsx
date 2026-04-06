"use client";

import { useEffect } from "react";

type FbqFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: (...args: unknown[]) => void;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq: FbqFunction;
    _fbq: unknown;
  }
}

export function FacebookPixel({ pixelId }: { pixelId: string }) {
  useEffect(() => {
    // Muda a URL quando o componente monta
    window.history.pushState({}, "", "/obrigado");

    if (!window.fbq) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      script.async = true;
      document.head.appendChild(script);

      const fbq: FbqFunction = Object.assign(
        function (...args: unknown[]) {
          if (fbq.callMethod) {
            fbq.callMethod(...args);
          } else {
            fbq.queue.push(args);
          }
        },
        {
          queue: [] as unknown[][],
          push: (...args: unknown[]) => fbq.queue.push(args),
          loaded: true,
          version: "2.0",
        }
      );

      window.fbq = fbq;
      window._fbq = fbq;

      script.onload = () => {
        window.fbq("init", pixelId);
        window.fbq("track", "PageView");
      };
    }

    // Volta a URL quando o componente desmonta
    return () => {
      window.history.pushState({}, "", "/");
    };
  }, [pixelId]);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
