import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Student } from '@/models';

interface EnrolledCourse {
  courseId: { toString: () => string };
  progress: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId');
  const courseId = searchParams.get('courseId');

  await dbConnect();
  const student = await Student.findById(studentId);
  
  if (!student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }

  const courseProgress = student.enrolledCourses.find(
    (course: EnrolledCourse) => course.courseId.toString() === courseId
  );

  if (!courseProgress) {
    return NextResponse.json({ error: 'Course not found for this student' }, { status: 404 });
  }

  return NextResponse.json({ progress: courseProgress.progress });
}

export async function PUT(request: Request) {
  const { studentId, courseId, progress } = await request.json();
  await dbConnect();

  const student = await Student.findById(studentId);
  
  if (!student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }

  const courseIndex = student.enrolledCourses.findIndex(
    (course: EnrolledCourse) => course.courseId.toString() === courseId
  );

  if (courseIndex === -1) {
    return NextResponse.json({ error: 'Course not found for this student' }, { status: 404 });
  }

  student.enrolledCourses[courseIndex].progress = progress;
  await student.save();

  return NextResponse.json({ message: 'Progress updated successfully' });
}