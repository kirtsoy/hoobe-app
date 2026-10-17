import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "kirtsoy | Hoo.be",
  description: "artist | streamer | vlogger",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Manrope:wght@500;700;800&family=Orbitron:wght@600;800;900&family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Syne:wght@700;800&family=Unbounded:wght@600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
