'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RegistrationForm from '@/components/RegistrationForm';
import LoginForm from '@/components/LoginForm';

export default function Home() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check local storage for user credentials on component mount
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleRegister = (name: string) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  const handleLogin = (name: string) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  const handleLogout = () => {
    setUsername('');
    localStorage.removeItem('username');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Welcome to E-Learning Portal</h1>
        
        {username ? (
          <div className="text-center">
            <p className="text-2xl mb-6">Hello, {username}!</p>
            <div className="space-x-4">
              <Link href="/courses" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
                Explore Courses
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-6 text-center text-gray-600">Start your learning journey today or share your knowledge with others!</p>
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
          </>
        )}
      </div>
    </div>
  );
}