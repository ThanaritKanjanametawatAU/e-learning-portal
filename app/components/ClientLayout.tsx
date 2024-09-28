'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

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
  // ... (keep the existing ToggleIcon component)
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
    <>
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
      {children}
      <Footer />
    </>
  );
}