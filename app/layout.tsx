import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { LayoutProvider } from "@/contexts/LayoutContext";
import { AuthProvider } from "@/contexts/AuthContext";
import NextTopLoader from "nextjs-toploader";
import NavigationOverlay from "@/shared/components/NavigationOverlay";

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
        <NextTopLoader color="#0445af" shadow={false} showSpinner={false} />
        <NavigationOverlay />
        <AuthProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
