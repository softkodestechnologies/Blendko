"use client";
import { Inter, Poppins, Babylonica, Public_Sans } from 'next/font/google';
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

const babylonica = Babylonica({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})

const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {metadata.title && <title>{String(metadata.title)}</title>}
        {metadata.description && (
          <meta name="description" content={String(metadata.description)} />
        )}
        <style jsx global>{`
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-poppins: ${poppins.style.fontFamily};
            --font-babylonica: ${babylonica.style.fontFamily};
            --font-public-sans: ${publicSans.style.fontFamily};
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