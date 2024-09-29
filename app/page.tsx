'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import RegistrationForm from '@/components/RegistrationForm';
import LoginForm from '@/components/LoginForm';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user, isTeacher, login, logout } = useAuth();
  const router = useRouter();
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [tempUserId, setTempUserId] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const userData = await response.json();
        login({
          id: userData.id,
          name: userData.name,
          teacherId: userData.teacherId,
          studentId: userData.studentId
        });
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        const userData = await response.json();
        setShowRoleSelection(true);
        setTempUserId(userData.id);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleRoleSelection = async (role: 'teacher' | 'student') => {
    try {
      if (!tempUserId) {
        throw new Error('User ID is missing');
      }
      const response = await fetch('/api/select-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: tempUserId, role }),
      });
      if (response.ok) {
        const userData = await response.json();
        login(userData);
        setShowRoleSelection(false);
        setTempUserId(null);
      } else {
        throw new Error('Role selection failed');
      }
    } catch (error) {
      console.error('Role selection error:', error);
      // Handle error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Welcome to E-Learning Portal</h1>
        
        {user ? (
          <div className="text-center">
            <p className="text-2xl mb-6">Hello, {user.name}!</p>
            <div className="space-x-4">
              <Link href="/courses" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
                Explore Courses
              </Link>
              <Button
                onClick={logout}
                variant="destructive"
              >
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-6 text-center text-gray-600">Start your learning journey today or share your knowledge with others!</p>
            {showRoleSelection ? (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Choose your role</h2>
                <div className="space-x-4">
                  <Button onClick={() => handleRoleSelection('teacher')}>I'm a Teacher</Button>
                  <Button onClick={() => handleRoleSelection('student')}>I'm a Student</Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
                  <RegistrationForm onRegister={handleRegister} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                  <LoginForm onLogin={handleLogin} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}