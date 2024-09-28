'use client';

import React from 'react';
import Link from 'next/link';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">E-Learning Portal</Link>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/courses" className="hover:underline">Courses</Link></li>
            <li><Link href="/profile" className="hover:underline">Profile</Link></li>
            {/* Add more navigation items as needed */}
          </ul>
        </div>
      </nav>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

    </div>
  );
}