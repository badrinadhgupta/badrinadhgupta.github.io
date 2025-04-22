import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Script from 'next/script';

const robotoCondensed = localFont({
  src: [
    {
      path: '../fonts/RobotoCondensed-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: '../fonts/RobotoCondensed-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-roboto-condensed'
});

export const metadata: Metadata = {
  title: "Badri Nerella",
  description: "Badri's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "r7ygiow38x");
          `}
        </Script>
      </head>
      <body
        className={`${robotoCondensed.className} antialiased bg-neutral-100`}
      >
        {children}
      </body>
    </html>
  );
}
