import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    const existingUser = await db.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return new NextResponse("Email already in use", { status: 400 });
    }

    // Create user with plain text password
    const user = await db.user.create({
      data: {
        name,
        email,
        password // Storing password as plain text
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[REGISTER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}