import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Outfit } from "next/font/google";
import "./globals.css";
import { FacebookPixel } from "@/components/FacebookPixel";
import { KeyboardLock } from "@/components/KeyboardLock";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Genesis | Renova Cred",
  description:
    "Analisamos sua situação para estruturar a melhor estratégia de recuperação de crédito, de forma individual e sigilosa.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={outfit.variable}>
      <body
        className="font-outfit min-h-screen"
        style={{ backgroundColor: "var(--bg-dark)", color: "var(--text-main)" }}>
        <KeyboardLock />
        <FacebookPixel pixelId="821974483680719" />
        <div
          className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at center, var(--bg-dark) 0%, var(--bg-darker) 100%)",
          }}>
          <div className="shape shape-1" /> <div className="shape shape-2" />
        </div>
        {/* Main content */}
        <main id="app-container" className="h-dvh overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
