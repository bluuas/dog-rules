import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from './context/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PWAInstaller } from './components/PWAInstaller';

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "DOG Rules - Card Game Reference",
  description: "Quick reference for DOG card game rules in multiple languages",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DOG Rules",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🃏</text></svg>"></link>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2c2c2c" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${montserrat.className} antialiased`}>
        <PWAInstaller />
        <ErrorBoundary>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
