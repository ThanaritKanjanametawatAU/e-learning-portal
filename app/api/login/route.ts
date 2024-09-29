import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User.js';  // Update this line

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log('Login attempt for email:', email);
    console.log('Provided password:', password); // Log the provided password

    await dbConnect();
    console.log('Database connected');

    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    console.log('User object:', JSON.stringify(user.toObject(), null, 2)); // Log the full user object
    console.log('Stored password:', user.password); // Log the stored password

    if (user.password !== password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Don't send the password back in the response
    const { password: _, ...userWithoutPassword } = user.toObject();
    console.log('Login successful');
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'An unexpected error occurred', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}