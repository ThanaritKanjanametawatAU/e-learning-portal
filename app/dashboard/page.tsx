'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface Course {
  _id: string;
  title: string;
  description: string;
}

export default function DashboardPage() {
  const { user, isTeacher } = useAuth();

  console.log('DashboardPage: Auth state', { user, isTeacher });

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;
      
      const endpoint = isTeacher ? '/api/courses/created' : '/api/courses/enrolled';
      const response = await fetch(`${endpoint}?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    };

    fetchCourses();
  }, [user, isTeacher]);

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">{isTeacher ? "Created Courses" : "Enrolled Courses"}</h1>
      {isTeacher && (
        <Link href="/courses/create" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-6 inline-block">
          Create New Course
        </Link>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {courses.map((course) => (
          <div key={course._id} className="border rounded p-4">
            <h2 className="text-xl font-bold mb-2">{course.title}</h2>
            <p className="mb-4">{course.description}</p>
            <Link href={`/courses/${course._id}`} className="text-blue-500 hover:underline">
              {isTeacher ? "Edit Course" : "View Course"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}