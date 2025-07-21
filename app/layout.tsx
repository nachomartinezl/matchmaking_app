// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // This is crucial for applying our base styles

const inter = Inter({ subsets: ['latin'] });

// This metadata will be used for SEO and the browser tab title
export const metadata: Metadata = {
  title: 'MatchMaker | Find Your Connection',
  description: 'A modern matchmaking app to find friends, dates, or relationships.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 
        The body tag will have our global font and background styles
        applied from globals.css. The `children` prop here will be 
        whatever page is currently active (e.g., our home page or the signup page).
      */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}