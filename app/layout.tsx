import '@/css/globals.css';
// import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

// export const metadata: Metadata = defaultMetadata;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.className}>
      <body className={`bg-primary-foreground`}>{children}</body>
    </html>
  );
}
