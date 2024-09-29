import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Your enrollment logic here
  return NextResponse.json({ message: 'Enrollment API route' });
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Your enrollment logic here
  return NextResponse.json({ message: 'Enrollment created' });
}