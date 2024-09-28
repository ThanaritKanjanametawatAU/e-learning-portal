import Teacher from "@/models/Teacher";
import { NextRequest } from "next/server";

export async function GET() {
  return Response.json(await Teacher.find());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const teacher = new Teacher(body);
  await teacher.save();
  return Response.json(teacher);
}