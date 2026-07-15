import type { Metadata } from "next";
import { Source_Sans_3, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/Providers/Providers";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HKUST 录取通知书 | Admission Letter 2026",
  description: "Hong Kong University of Science and Technology digital admission experience. 香港科技大学数字入学体验。",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%23003366'/><stop offset='100%25' stop-color='%23996600'/></linearGradient></defs><rect fill='url(%23g)' width='100' height='100' rx='20'/><text y='68' x='50' text-anchor='middle' font-size='50' fill='%23996600' font-weight='bold' font-family='Arial'>HKUST</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="scroll-smooth">
      <body className={`${sourceSans.variable} ${notoSans.variable} min-h-screen antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
