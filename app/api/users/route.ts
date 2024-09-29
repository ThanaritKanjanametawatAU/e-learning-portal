import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const users = await User.find({});
    console.log('Users found:', users);
    
    if (users.length === 0) {
      return NextResponse.json({ message: 'No users found' }, { status: 404 });
    }
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error in GET /api/users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await dbConnect();

    const { name, email, password, roles } = body;

    if (!name || !email || !password || !roles) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      roles,
    });

    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to create user', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
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

export async function PATCH(request: NextRequest) {
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