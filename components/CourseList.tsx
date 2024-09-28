import React from 'react';
import Link from 'next/link';

interface Course {
  _id: string;
  title: string;
  description: string;
}

interface CourseListProps {
  courses: Course[];
}

export default function CourseList({ courses }: CourseListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {courses.map((course) => (
        <div key={course._id} className="border rounded p-4">
          <h2 className="text-xl font-bold mb-2">{course.title}</h2>
          <p className="mb-4">{course.description}</p>
          <Link href={`/courses/${course._id}`} className="text-blue-500 hover:underline">
            View Course
          </Link>
        </div>
      ))}
    </div>
  );
}