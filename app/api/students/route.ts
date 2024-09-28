import Student from "@/models/Student";
import { NextRequest } from "next/server";

export async function GET() {
  return Response.json(await Student.find());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const student = new Student(body);
  await student.save();
  return Response.json(student);
}