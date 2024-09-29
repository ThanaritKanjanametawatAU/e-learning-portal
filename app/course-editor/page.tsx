'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function BrowseCoursesPage() {
  const { user, isTeacher } = useAuth();

  console.log('CourseEditorPage: Auth state', { user, isTeacher });

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

  if (isTeacher) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Teacher View: All Courses</h1>
        <p className="mb-4">Welcome, {user.name}! Here you can manage your courses.</p>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Create New Course
        </button>
        {/* Add more teacher-specific content here */}
      </div>
    );
  } else {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Student View: Browse All Courses</h1>
        <p className="mb-4">Welcome, {user.name}! Here you can browse and enroll in courses.</p>
        {/* Add course browsing and enrollment functionality for students */}
      </div>
    );
  }
}