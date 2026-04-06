import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "DigiGrowth | Máquina de Vendas e CRM",
  description:
    "Tráfego Pago, CRM e IA para empresas que querem vender com mais previsibilidade.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={outfit.variable}>
      <body
        className="font-outfit min-h-screen overflow-hidden"
        style={{ backgroundColor: "var(--bg-dark)", color: "var(--text-main)" }}>
        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1381334544032874');
          fbq('track', 'PageView');
        `}</Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1381334544032874&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Animated background shapes */}
        <div
          className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at center, var(--bg-dark) 0%, var(--bg-darker) 100%)",
          }}>
          <div className="shape shape-1" />
          <div className="shape shape-2" />
        </div>

        {/* Main content */}
        <main id="app-container" className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
