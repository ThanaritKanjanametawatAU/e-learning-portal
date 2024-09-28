import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models';

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
  const body = await request.json();
  await dbConnect();
  const user = await User.create(body);
  return NextResponse.json(user, { status: 201 });
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