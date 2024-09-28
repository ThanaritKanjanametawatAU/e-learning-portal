import Teacher from "@/models/Teacher";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const teacher = await Teacher.findById(params.id);
  if (!teacher) {
    return new Response("Teacher not found", { status: 404 });
  }
  return Response.json(teacher);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const teacher = await Teacher.findByIdAndUpdate(params.id, body, { new: true });
  if (!teacher) {
    return new Response("Teacher not found", { status: 404 });
  }
  return Response.json(teacher);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const teacher = await Teacher.findByIdAndUpdate(params.id, body, { new: true });
  if (!teacher) {
    return new Response("Teacher not found", { status: 404 });
  }
  return Response.json(teacher);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const teacher = await Teacher.findByIdAndDelete(params.id);
  if (!teacher) {
    return new Response("Teacher not found", { status: 404 });
  }
  return new Response(null, { status: 204 });
}