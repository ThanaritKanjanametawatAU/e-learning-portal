import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { name, email, password } = await request.json();

    const user = new User({
      _id: new ObjectId(),
      name,
      email,
      password, // In a real app, you should hash the password
    });

    const savedUser = await user.save();

    return NextResponse.json({ id: savedUser._id, name: savedUser.name }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}