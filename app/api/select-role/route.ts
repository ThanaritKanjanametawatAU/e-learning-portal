import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User, Teacher, Student } from '@/models';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { userId, role } = await request.json();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (role === 'teacher') {
      const teacher = new Teacher({ userId: user._id });
      await teacher.save();
      user.teacherId = teacher._id;
    } else if (role === 'student') {
      const student = new Student({ userId: user._id });
      await student.save();
      user.studentId = student._id;
    } else {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    await user.save();

    return NextResponse.json({
      id: user._id,
      name: user.name,
      teacherId: user.teacherId,
      studentId: user.studentId
    });
  } catch (error) {
    console.error('Error selecting role:', error);
    return NextResponse.json({ error: 'Failed to select role' }, { status: 500 });
  }
}