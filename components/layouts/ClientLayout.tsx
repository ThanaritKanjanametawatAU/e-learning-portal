'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '../Footer';
import NavLink from '../NavLink';
import { useAuth } from '@/contexts/AuthContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isTeacher } = useAuth();

  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">E-Learning Portal</Link>
          <div className="space-x-4 flex items-center">
            <NavLink href="/">Home</NavLink>
            {user ? (
              <>
                <NavLink href="/browse-courses">Browse All Courses</NavLink>
                <NavLink href="/my-courses">My Courses</NavLink>
                <NavLink href="/profile">Profile</NavLink>
                <NavLink href="/dashboard">Dashboard</NavLink>
                <span className="ml-4 font-semibold">
                  {isTeacher ? "Teacher's View" : "Student's View"}
                </span>
              </>
            ) : (
              <>
                <NavLink href="/login">Login</NavLink>
                <NavLink href="/register">Register</NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
      {children}
      <Footer />
    </>
  );
}