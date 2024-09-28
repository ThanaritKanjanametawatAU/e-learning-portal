import React from 'react';
import Link from 'next/link';
import dbConnect from '../../lib/db';
import { Course } from '../../models';

async function getCourses() {
  await dbConnect();
  const courses = await Course.find({}).lean();
  return courses;
}

export default async function CourseCatalog() {
  const courses = await getCourses();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Course Catalog</h1>
      <div className="mb-6">
        <input type="text" placeholder="Search courses" className="p-2 border rounded" />
        <button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Search</button>
      </div>
      <Link href="/courses/create" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
        Create New Course
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {courses.map((course: any) => (
          <div key={course._id.toString()} className="border rounded p-4">
            <h2 className="text-xl font-bold mb-2">{course.title}</h2>
            <p className="mb-4">{course.description}</p>
            <Link href={`/courses/${course._id}`} className="text-blue-500 hover:underline">
              View Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}