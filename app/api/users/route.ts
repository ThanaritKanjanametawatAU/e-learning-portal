import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User.js';  // Update this line
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const users = await User.find({});
    console.log('Users found:', users); // Add this line for debugging
    
    if (users.length === 0) {
      return NextResponse.json({ message: 'No users found' }, { status: 404 });
    }
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error in GET /api/users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received registration data:', body); // Log the full body including password

    await dbConnect();
    console.log('Database connected');

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    // Create user object with all required fields
    const userObject = {
      name: body.name,
      email: body.email,
      password: body.password, // Store password as plain text
      roles: body.roles
    };

    console.log('Creating user with data:', userObject); // Log the full user object

    const user = await User.create(userObject);

    console.log('User created:', JSON.stringify(user.toObject(), null, 2)); // Log the full user object

    // Add this line to log the actual saved document
    const savedUser = await User.findById(user._id);
    console.log('Saved user document:', savedUser ? JSON.stringify(savedUser.toObject(), null, 2) : 'User not found');

    // Don't send the password back in the response
    const { password, ...userWithoutPassword } = user.toObject();
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to create user', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  if (!body._id) {
    return NextResponse.json({ error: 'ID is required for PUT request' }, { status: 400 });
  }
  await dbConnect();
  const user = await User.findByIdAndUpdate(body._id, body, { new: true });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  if (!body._id) {
    return NextResponse.json({ error: 'ID is required for PATCH request' }, { status: 400 });
  }
  await dbConnect();
  const user = await User.findByIdAndUpdate(body._id, body, { new: true });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json(user);
}