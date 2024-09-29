'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface RegistrationFormProps {
  onRegister: (name: string) => void;
}

export default function RegistrationForm({ onRegister }: RegistrationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Register user
      const userResponse = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!userResponse.ok) {
        throw new Error('Failed to register user');
      }

      const userData = await userResponse.json();

      // Create student record
      const studentResponse = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userData.userId,
          enrolledCourses: [{
            courseId: "66f7f6ccb2ebcfd57d78508a",
            progress: 0,
            enrollmentDate: new Date().toISOString()
          }]
        }),
      });

      if (!studentResponse.ok) {
        throw new Error('Failed to create student record');
      }

      const studentData = await studentResponse.json();

      // Update user with studentId
      const updateUserResponse = await fetch(`/api/users/${userData.userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: studentData.studentId }),
      });

      if (!updateUserResponse.ok) {
        throw new Error('Failed to update user with student ID');
      }

      onRegister(name);
      router.push('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

}