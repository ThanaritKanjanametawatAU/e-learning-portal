import React from 'react';
import CourseList from '@/components/CourseList';
import SearchBar from '@/components/SearchBar';

// This is a mock function. In a real application, you would fetch this data from an API.
const getMockCourses = () => [
  { _id: '1', title: 'Introduction to React', description: 'Learn the basics of React' },
  { _id: '2', title: 'Advanced TypeScript', description: 'Master TypeScript for large-scale applications' },
  { _id: '3', title: 'Next.js Fundamentals', description: 'Build server-side rendered React applications' },
];

export default function BrowseCoursesPage() {
  const courses = getMockCourses();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse All Courses</h1>
      <SearchBar />
      <CourseList courses={courses} />
    </div>
  );
}