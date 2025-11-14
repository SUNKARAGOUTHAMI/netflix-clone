import './globals.css';
import { ReactNode } from 'react';
import Header from './components/Header';

export const metadata = {
  title: 'My Streaming Dashboard',
  description: 'A simplified streaming service dashboard built with Next.js 14 and Tailwind CSS',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body className="bg-gray-900 text-white min-h-screen">
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
