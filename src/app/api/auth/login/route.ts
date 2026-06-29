import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas/loginSchema";

export async function POST(request: Request) {
  try {
    // Read request body
    const body = await request.json();

    // Validate request
    const result = loginSchema.safeParse(body);

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

    // Find parent by email
    const parent = await prisma.parent.findUnique({
      where: {
        email: result.data.email,
      },
    });

    // Parent not found
    if (!parent) {
      return NextResponse.json(
        {
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
      result.data.password,
      parent.passwordHash
    );

    // Wrong password
    if (!passwordMatch) {
      return NextResponse.json(
        {
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    // Login successful
    return NextResponse.json(
      {
        message: "Login successful!",
        parent: {
          id: parent.id,
          name: parent.name,
          email: parent.email,
        },
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}