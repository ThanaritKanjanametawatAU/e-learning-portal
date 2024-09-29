import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Student from '@/models/Student';

export async function GET() {
  await dbConnect();
  return NextResponse.json(await Student.find());
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const student = new Student(body);
    await student.save();
    console.log('Student created:', student._id);
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error('Student creation error:', error);
    return NextResponse.json({ message: 'An error occurred while creating the student record' }, { status: 500 });
  }
}