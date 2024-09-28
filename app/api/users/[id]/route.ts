import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log('Attempting to connect to database...');
    await dbConnect();
    console.log('Database connected successfully');
    
    console.log('Searching for user with ID:', params.id);
    const user = await User.findById(params.id);
    
    if (!user) {
      console.log('User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    console.log('User found:', user);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in GET /api/users/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const user = await User.findByIdAndDelete(params.id);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'User deleted successfully' });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  await dbConnect();
  const user = await User.findByIdAndUpdate(params.id, body, { new: true });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json(user);
}