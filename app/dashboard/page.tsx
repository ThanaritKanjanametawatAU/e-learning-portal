import React from 'react';
import Link from 'next/link';
import dbConnect from '../../lib/db';
import { Course, User } from '../../models';

async function getUserData(userId: string) {
  await dbConnect();
  const user = await User.findById(userId).lean();
  const courses = await Course.find({ teacherId: user.teacherId }).lean();
  return { user, courses };
}

export default async function Dashboard() {
  // In a real app, you'd get the user ID from the session
  const userId = 'dummy-user-id';
  const { user, courses } = await getUserData(userId);

  const isTeacher = !!user.teacherId;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">{isTeacher ? "Created Courses" : "Enrolled Courses"}</h1>
      {isTeacher && (
        <Link href="/courses/create" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-6 inline-block">
          Create New Course
        </Link>
      )}
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