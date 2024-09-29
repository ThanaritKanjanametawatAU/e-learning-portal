import React from 'react';
import CourseList from '@/components/CourseList';

// This is a mock function. In a real application, you would fetch this data from an API.
const getMockEnrolledCourses = () => [
  { _id: '1', title: 'Introduction to React', description: 'Learn the basics of React' },
  { _id: '3', title: 'Next.js Fundamentals', description: 'Build server-side rendered React applications' },
];

export default function MyCoursesPage() {
  const enrolledCourses = getMockEnrolledCourses();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      {enrolledCourses.length > 0 ? (
        <CourseList courses={enrolledCourses} />
      ) : (
        <p>You are not enrolled in any courses yet.</p>
      )}
    </div>
  );
}