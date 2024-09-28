import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Lesson } from '@/models';

export async function GET() {
  try {
    await dbConnect();
    const lessons = await Lesson.find().populate('courseId');
    return NextResponse.json(lessons);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, order, courseId } = await request.json();
    await dbConnect();
    const newLesson = new Lesson({ title, content, order, courseId });
    await newLesson.save();
    return NextResponse.json(newLesson, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 });
  }
}