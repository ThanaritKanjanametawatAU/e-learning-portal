'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserDetails {
  email: string;
}

export default function ProfilePage() {
  const { user, isTeacher } = useAuth();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserDetails() {
      if (user?.id) {
        try {
          const response = await fetch(`/api/users/${user.id}`);
          if (!response.ok) throw new Error('Failed to fetch user details');
          const data: UserDetails = await response.json();
          setUserDetails(data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchUserDetails();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
        <button 
          onClick={() => router.push('/login')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center mt-8">Loading user details...</div>;
  }

  const ProfileContent = () => (
    <>
      <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
      <p className="mb-2"><strong>Name:</strong> {user.name}</p>
      {userDetails && (
        <p className="mb-2"><strong>Email:</strong> {userDetails.email}</p>
      )}
    </>
  );

  if (isTeacher) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Teacher Profile</h1>
        <ProfileContent />
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Manage Courses</h3>
          <button 
            onClick={() => router.push('/courses/create')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create New Course
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Student Profile</h1>
        <ProfileContent />
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">My Courses</h3>
          <button 
            onClick={() => router.push('/browse-all-courses')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Browse All Courses
          </button>
        </div>
      </div>
    );
  }
}