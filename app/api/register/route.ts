import { hash, compare } from "bcryptjs";
import { NextResponse } from "next/server";
import User from "app/models/User";
import connectDB from "app/lib/connect-db";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !name || !password) {
      return null;
    }

    await connectDB();

    const hashed_password = await hash(password, 12);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed_password,
      createdAt: Date.now(),
    });

    return NextResponse.json({
      status: 201,
      message: "User Created",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
