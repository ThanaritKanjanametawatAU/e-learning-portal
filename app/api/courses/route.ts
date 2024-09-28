import Course from "@/models/Course";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();
  try {
    console.log('MongoDB connection state:', mongoose.connection.readyState);
    const courses = await Course.find();
    console.log('Courses found:', courses);
    if (courses.length === 0) {
      return new Response('No courses found', { status: 404 });
    }
    return Response.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return new Response('Error fetching courses', { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const course = new Course(body);
  await course.save();
  return Response.json(course);
}