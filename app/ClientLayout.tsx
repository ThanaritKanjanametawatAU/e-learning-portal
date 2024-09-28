'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} className={`${isActive ? 'font-bold' : ''} hover:underline`}>
      {children}
    </Link>
  );
}

function ToggleIcon({ isTeacher, onClick }: { isTeacher: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 focus:outline-none"
      aria-label="Toggle Teacher/Student View"
    >
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out">
        {isTeacher ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )}
      </div>
    </button>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isTeacher, setIsTeacher] = useState(false);

  const toggleView = () => {
    setIsTeacher(!isTeacher);
  };

  return (
    <body className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">E-Learning Portal</Link>
          <div className="space-x-4 flex items-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/profile">Profile</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <ToggleIcon isTeacher={isTeacher} onClick={toggleView} />
          </div>
        </div>
      </nav>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

    </body>
  );
}