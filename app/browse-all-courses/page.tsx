'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { fetchCourses, deleteCourse } from '@/services/courseService';
import { useRouter } from 'next/navigation';

export default function BrowseAllCoursesPage() {
  const { user, isTeacher } = useAuth();
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadCourses() {
      const fetchedCourses = await fetchCourses();
      setCourses(fetchedCourses);
    }
    loadCourses();
  }, []);

  async function handleDelete(courseId: string) {
    await deleteCourse(courseId);
    setCourses(courses.filter(course => course._id !== courseId));
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Please log in to view courses</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{isTeacher ? 'Teacher View: All Courses' : 'Student View: Browse All Courses'}</h1>
      <p className="mb-4">Welcome, {user.name}! Here you can {isTeacher ? 'manage' : 'browse and enroll in'} your courses.</p>
      {isTeacher && (
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => router.push('/courses/create')}
        >
          Create New Course
        </button>
      )}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course._id} className="p-4 border rounded">
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p>{course.description}</p>
            {isTeacher ? (
              <div className="flex space-x-2">
                <button
                  className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={() => router.push(`/courses/edit/${course._id}`)}
                >
                  Edit Course
                </button>
                <button
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete Course
                </button>
              </div>
            ) : (
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => router.push(`/learn/${course._id}`)}
              >
                View Lessons
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}