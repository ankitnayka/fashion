import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = signupSchema.parse(body);

    // check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // remove password from response
    const { password: _, ...safeUser } = user;

    return NextResponse.json(
      { message: "Signup successful", user: safeUser },
      { status: 201 }
    );
  } catch (error) {
  console.error("SIGNUP ERROR:", error);

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { message: "Invalid input", errors: error.issues },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 }
  );
}

}
