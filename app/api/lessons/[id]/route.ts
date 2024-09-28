import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lesson from '@/models/Lesson';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const lesson = await Lesson.findById(params.id).populate('courseId');
    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }
    return NextResponse.json(lesson);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lesson' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { title, content, order, courseId } = await request.json();
    await dbConnect();
    const updatedLesson = await Lesson.findByIdAndUpdate(
      params.id,
      { title, content, order, courseId },
      { new: true }
    );
    if (!updatedLesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }
    return NextResponse.json(updatedLesson);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update lesson' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const deletedLesson = await Lesson.findByIdAndDelete(params.id);
    if (!deletedLesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete lesson' }, { status: 500 });
  }
}