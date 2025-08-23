// app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';
import { inter } from './landing/fonts';

export const metadata: Metadata = {
  title: 'Connect | Find Your Connection',
  description: 'A human-first dating platform designed for real connection, not just surface swipes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        {/* Ensure proper scaling on all devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
