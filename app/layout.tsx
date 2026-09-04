import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Alex Morgan — Motion Designer & Video Editor',
  description:
    'Independent motion designer and video editor creating kinetic identities, title sequences and films.',
  openGraph: {
    title: 'I MAKE IDEAS MOVE.',
    description: 'Motion Designer & Video Editor',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'I MAKE IDEAS MOVE.',
    description: 'Motion Designer & Video Editor',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
