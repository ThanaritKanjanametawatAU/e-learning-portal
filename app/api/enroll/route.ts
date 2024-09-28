import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Student, Course } from '@/models';

export async function POST(request: Request) {
  const { studentId, courseId } = await request.json();
  await dbConnect();
  
  const student = await Student.findById(studentId);
  const course = await Course.findById(courseId);

  if (!student || !course) {
    return NextResponse.json({ error: 'Student or Course not found' }, { status: 404 });
  }

  student.enrolledCourses.push({ courseId, progress: 0, enrollmentDate: new Date() });
  course.enrolledStudents.push(studentId);

  await student.save();
  await course.save();

  return NextResponse.json({ message: 'Enrollment successful' }, { status: 200 });
}