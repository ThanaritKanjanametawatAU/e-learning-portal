import Student from "@/models/Student";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const student = await Student.findById(params.id);
  if (!student) {
    return new Response("Student not found", { status: 404 });
  }
  return Response.json(student);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const student = await Student.findByIdAndUpdate(params.id, body, { new: true });
  if (!student) {
    return new Response("Student not found", { status: 404 });
  }
  return Response.json(student);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const student = await Student.findByIdAndUpdate(params.id, body, { new: true });
  if (!student) {
    return new Response("Student not found", { status: 404 });
  }
  return Response.json(student);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const student = await Student.findByIdAndDelete(params.id);
  if (!student) {
    return new Response("Student not found", { status: 404 });
  }
  return new Response(null, { status: 204 });
}