import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { ObjectId } from 'mongodb';


export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json();
    
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // If the role is student, create a Student document
    if (role === 'student') {
      const studentData = {
        userId: newUser._id.toString(),
        enrolledCourses: [{
          courseId: new ObjectId("66f7f6ccb2ebcfd57d78508a"),
          progress: 0,
          enrollmentDate: new Date()
        }]
      };

      // Make a POST request to the student API
      const studentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!studentResponse.ok) {
        throw new Error('Failed to create student record');
      }

      const studentResult = await studentResponse.json();
      console.log('Student created:', studentResult);


      // Update the user with the student ID
      await User.findByIdAndUpdate(newUser._id, { studentId: studentResult._id });
      console.log('User updated with student ID:', newUser);
    }

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 });
  }
}