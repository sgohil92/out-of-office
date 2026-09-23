import type { Metadata, Viewport } from "next";
import { Courier_Prime, IM_Fell_English, IM_Fell_English_SC } from "next/font/google";
import "./globals.css";

const fell = IM_Fell_English({
  variable: "--font-fell",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const fellSC = IM_Fell_English_SC({
  variable: "--font-fell-sc",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const courier = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Otherwise Occupied — Sabbatical 2026 / Vol. 1",
  description:
    "An archival digital studio: destinations, play, bookshelf, and next.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fell.variable} ${fellSC.variable} ${courier.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0C0B0A] text-[#EAE5D9]">{children}</body>
    </html>
  );
}
