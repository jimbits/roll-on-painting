// layout.tsx
import '@/css/globals.css';
import type { Metadata } from 'next';
import { defaultMetadata } from './metadata';
import { Inter } from 'next/font/google';

// Optimized Inter font configuration
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'], // Only include weights you use
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.variable}>
      <body className='font-sans'>{children}</body>
    </html>
  );
}
