import Teacher from "@/models/Teacher";
import User from "@/models/User";
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET() {
  await dbConnect();
  return NextResponse.json(await Teacher.find());
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Create the teacher
    const teacher = await Teacher.create(body);
    
    // Update the user with the new teacherId
    await User.findByIdAndUpdate(body.userId, {
      $set: { 
        teacherId: teacher._id,
        role: 'teacher'
      }
    });

    return NextResponse.json(teacher, { status: 201 });
  } catch (error) {
    console.error('Error creating teacher:', error);
    return NextResponse.json({ error: 'Failed to create teacher' }, { status: 500 });
  }
}