import { NextResponse } from "next/server";
import { signupSchema } from "@/schemas/signupSchema";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = signupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const existingParent = await prisma.parent.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (existingParent) {
      return NextResponse.json(
        {
          message: "An account with this email already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(result.data.password, 10);

const parent = await prisma.parent.create({
  data: {
    name: result.data.name,
    email: result.data.email,
    passwordHash: hashedPassword,
  },
});

return NextResponse.json(
  {
    message: "Account created successfully!",
    parent: {
      id: parent.id,
      name: parent.name,
      email: parent.email,
    },
  },
  {
    status: 201,
  }
);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}