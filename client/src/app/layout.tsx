"use client";
import { Inter, Poppins } from 'next/font/google'
import "./globals.css";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import { Providers } from './providers';
import { metadata } from './metadata';
import CookieConsent from "@/components/ui/CookieConsent";
import ShoppingPreferences from "@/components/ui/ShoppingPreferences";
// import '@/components/layouts/Footer.css';
// import '../components/layouts/Header.css';
// import '../components/layouts/LogoSVG.css';
// import '../components/ui/Cart.css';
// import '../components/ui/CookieConsent.css';
// import '../components/ui/HamburgerMenu.css';
// import '../components/ui/loading/LoadingSpinner';
// import '../components/ui/modal/Modal.css';
// import '../components/user/UserMenu.css';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '900']
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '900']
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          }
          html {
            font-family: var(--font-inter);
          }
        `}
        </style>
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
      <body>
      <Providers>
        <Header/>
          <CookieConsent />
          <ShoppingPreferences />
          <div>
              <div>{children}</div>
          </div>
        <Footer/>
        </Providers>
      </body>
    </html>
  );
}
