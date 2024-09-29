'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RegistrationForm from '@/components/RegistrationForm';
import LoginForm from '@/components/LoginForm';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [user, setUser] = useState<{ name: string; id: string } | null>(null);
  const [role, setRole] = useState<'student' | 'teacher' | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      checkUserRole(JSON.parse(storedUser).id);
    }
    if (storedRole) {
      setRole(storedRole as 'student' | 'teacher');
    }
  }, []);

  const checkUserRole = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        if (userData.studentId) {
          setRole('student');
          localStorage.setItem('role', 'student');
        } else if (userData.teacherId) {
          setRole('teacher');
          localStorage.setItem('role', 'teacher');
        }
      }
    } catch (error) {
      console.error('Error checking user role:', error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const userData = await response.json();
        const loggedInUser = { name: userData.name, id: userData.id };
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        
        // Check user role immediately after login
        await checkUserRole(userData.id);
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
        const newUser = { name: userData.name, id: userData.id };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        // Don't set role here, let the user choose after registration
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  const handleRoleSelection = async (selectedRole: 'student' | 'teacher') => {
    if (!user) {
      console.error('User is not available');
      return;
    }

    try {
      // Check if user already has a role
      const userID = user.id;
      const userResponse = await fetch(`/api/users/${userID}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await userResponse.json();

      if (userData.studentId || userData.teacherId) {
        console.log(`User is already a ${userData.studentId ? 'student' : 'teacher'}`);
        setRole(userData.studentId ? 'student' : 'teacher');
        localStorage.setItem('role', userData.studentId ? 'student' : 'teacher');
        return;
      }

      let roleEndpoint: string;

      if (selectedRole === 'student') {
        roleEndpoint = '/api/students';
        const studentResponse = await fetch(roleEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userID,
            enrolledCourses: [{
              courseId: "66f7f6ccb2ebcfd57d78508a",
              progress: 0,
              enrollmentDate: new Date().toISOString()
            }]
          })
        });

        if (!studentResponse.ok) {
          throw new Error('Failed to create student');
        }
      } else {
        roleEndpoint = '/api/teachers';
        const teacherResponse = await fetch(roleEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            userId: userID,
            courses: [] // Initialize with an empty array of courses
          })
        });

        if (!teacherResponse.ok) {
          throw new Error('Failed to create teacher');
        }
      }

      console.log(`${selectedRole} created and user updated successfully`);
      localStorage.setItem('role', selectedRole);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Welcome to E-Learning Portal</h1>
        
        {user ? (
          <div className="text-center">
            <p className="text-2xl mb-6">Hello, {user.name}!</p>
            {!role ? (
              <div className="space-y-4">
                <p className="text-lg mb-4">Please select your role:</p>
                <div className="space-x-4">
                  <Button onClick={() => handleRoleSelection('student')}>
                    I'm a Student
                  </Button>
                  <Button variant="secondary" onClick={() => handleRoleSelection('teacher')}>
                    I'm a Teacher
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-x-4">
                <Link href="/courses" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
                  Explore Courses
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                >
                  Logout
                </Button>
              </div>
            )}
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