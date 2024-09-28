import React from 'react';
import Link from 'next/link';
import dbConnect from '../../../lib/db';
import { Course } from '../../../models';

async function getCourse(id: string) {
  await dbConnect();
  const course = await Course.findById(id).lean();
  return course;
}

export default async function CourseDetail({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">{course.title}</h1>
      <p className="mb-4">{course.description}</p>
      <p className="mb-4">Teacher: {course.teacherId}</p>
      <h2 className="text-2xl font-bold mb-4">Lessons</h2>
      {/* List of lessons would go here */}
      <div className="space-x-4 mt-6">
        <Link href={`/courses/${course._id}/enroll`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Enroll
        </Link>
        <Link href={`/courses/${course._id}/edit`} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Edit Course
        </Link>
      </div>
    </div>
  );
}