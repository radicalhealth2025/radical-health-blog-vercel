import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "@/styles/globals.css";
import { AudioProvider } from "@/lib/hooks";
import { Header, Footer, SkipToContent } from "@/components/layout";
import { ErrorBoundary } from "@/components/ui";
import { generateHomeMetadata } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = generateHomeMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased`}
      >
        <SkipToContent />
        <AudioProvider audioSrc="/audio/healing-music.mp3">
          <Header />
          <ErrorBoundary>
            <main id="main-content">{children}</main>
          </ErrorBoundary>
          <Footer />
        </AudioProvider>
      </body>
    </html>
  );
}
