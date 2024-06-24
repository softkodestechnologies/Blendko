"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import { Providers } from './providers';
import { metadata } from './metadata';
import CookieConsent from "@/components/ui/CookieConsent";
import ShoppingPreferences from "@/components/ui/ShoppingPreferences";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  auth,
  children,
}: Readonly<{
  auth: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {metadata.title && <title>{String(metadata.title)}</title>}
        {metadata.description && (
          <meta name="description" content={String(metadata.description)} />
        )}
      </head>
      {/*<head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const originalConsoleError = console.error;
                console.error = function(...args) {
                  if (args[0] && args[0].includes('Warning: Extra attributes from the server')) {
                    return;
                  }
                  originalConsoleError.apply(console, args);
                };
              })();
            `,
          }}
        />
      </head>*/}
      <body className={inter.className}>
      <Providers>
        <Header/>
          <CookieConsent />
          <ShoppingPreferences />
          <div>
              <div>{auth}</div>
              <div>{children}</div>
          </div>
        <Footer/>
        </Providers>
      </body>
    </html>
  );
}
