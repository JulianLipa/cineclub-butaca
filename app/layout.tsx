import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Header from "@/shared/components/header/Header";
import MainWrapper from "@/shared/components/mainWrapper/MainWrapper";
import { LayoutProvider } from "@/contexts/LayoutContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cineclub Butaca",
  description: "Cartelera y ciclos de cine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <LayoutProvider>
          <header className="sticky top-0 z-1000">
            <Header />
          </header>

          <MainWrapper>{children}</MainWrapper>
        </LayoutProvider>
      </body>
    </html>
  );
}
