import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistemul de management al școlii',
  description: 'Un sistem cuprinzător de management al școlii',
};

/**
 * The root layout component. This component is the top-level component
 * that is rendered by Next.js for every page. It is responsible for
 * rendering the HTML skeleton and the child components.
 *
 * @param children - The child components of the root layout.
 * @returns The root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
