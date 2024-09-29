import React from 'react';
import Link from 'next/link';
import CourseList from '@/components/CourseList';
import SearchBar from '@/components/SearchBar';

export default async function CourseCatalog() {

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Course Catalog</h1>
      <SearchBar />
      <Link href="/courses/create" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
        Create New Course
      </Link>
    </div>
  );
}