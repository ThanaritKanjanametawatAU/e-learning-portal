import Course from "@/models/Course";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const course = await Course.findById(params.id);
  if (!course) {
    return new Response("Course not found", { status: 404 });
  }
  return Response.json(course);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const course = await Course.findByIdAndUpdate(params.id, body, { new: true });
  if (!course) {
    return new Response("Course not found", { status: 404 });
  }
  return Response.json(course);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const course = await Course.findByIdAndUpdate(params.id, body, { new: true });
  if (!course) {
    return new Response("Course not found", { status: 404 });
  }
  return Response.json(course);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const course = await Course.findByIdAndDelete(params.id);
  if (!course) {
    return new Response("Course not found", { status: 404 });
  }
  return new Response(null, { status: 204 });
}