"use client";
import { Inter, Poppins } from 'next/font/google';
import "./globals.css";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import { Providers } from './providers';
import { metadata } from './metadata';
import CookieConsent from "@/components/ui/CookieConsent";
import ShoppingPreferences from "@/components/ui/ShoppingPreferences";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '900']
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '900']
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Babylonica&display=swap" rel="stylesheet" />
        {metadata.title && <title>{String(metadata.title)}</title>}
        {metadata.description && (
          <meta name="description" content={String(metadata.description)} />
        )}
        <style jsx global>{`
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-poppins: ${poppins.style.fontFamily};
            --font-babylonica: 'Babylonica', cursive;
          }
          html {
            font-family: var(--font-inter);
          }
        `}</style>
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
      </head>
      <body>
        <Providers>
          <Header />
          <CookieConsent />
          <ShoppingPreferences />
          <div>
            <div>{children}</div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}