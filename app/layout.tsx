import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { LayoutProvider } from "@/contexts/LayoutContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
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
    // Tema por defecto: claro (data-theme estático). ThemeProvider aplica "dark"
    // al montar solo si el usuario lo guardó explícitamente con el toggle.
    // suppressHydrationWarning porque ese atributo lo muta el cliente.
    <html
      lang="es"
      className={inter.variable}
      data-theme="light"
      suppressHydrationWarning
    >
      <body>
        <NextTopLoader color="#0445af" shadow={false} showSpinner={false} />
        <NavigationOverlay />
        <ThemeProvider>
          <AuthProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
