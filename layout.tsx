import "./globals.css";
import { Providers } from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Axiom Token Table",
  description: "Token trading table replica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-slate-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
