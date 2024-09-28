import React from 'react';
import type { Metadata } from 'next';
import "./globals.css";
import ClientLayout from './components/ClientLayout';

export const metadata: Metadata = {
  title: "E-Learning Portal",
  description: "An advanced e-learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ClientLayout>
          <main className="flex-grow">
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  );
}