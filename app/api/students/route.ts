import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Student from '@/models/Student';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { userId, enrolledCourses } = await request.json();

    const student = new Student({
      userId: new ObjectId(userId), // Convert string to ObjectId
      enrolledCourses: enrolledCourses.map((course: any) => ({
        ...course,
        courseId: new ObjectId(course.courseId) // Convert courseId to ObjectId
      })),
      createdAt: new Date()
    });

    const savedStudent = await student.save();

    return NextResponse.json({ id: savedStudent._id }, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 });
  }
}