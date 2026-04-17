import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Sharad Babar Portfolio',
  description: 'A high-end personal portfolio built with Next.js, Framer Motion, and Canvas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth scroll-pt-24">
      <body className={`${inter.variable} font-sans bg-black text-white antialiased selection:bg-white/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
