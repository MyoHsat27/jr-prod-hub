import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import AudioPlayer from "@/components/ui/AudioPlayer";
import Scanlines from "@/components/ui/Scanlines";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import { AudioPlayerProvider } from "@/contexts/AudioPlayerContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Jr Prod | Beat Producer",
  description:
    "Independent beat producer crafting lo-fi, trap, hip-hop, and R&B beats. Enter the audio terminal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <AudioPlayerProvider>
          <Scanlines />
          <NoiseOverlay />
          <Navbar />
          <main className="pt-16 pb-24">{children}</main>
          <AudioPlayer />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
