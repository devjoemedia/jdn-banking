import connectDB from "../../lib/connect-db";
import User from "../../models/User";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    await connectDB();
    const users = await User.find();

    return NextResponse.json({
      status: 201,
      message: "Success",
      users,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: (error as Error).message || "Something Wen't wrong",
    });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const res = await request.json();
    await connectDB();
    await User.create({ ...res });

    return NextResponse.json({
      status: 201,
      message: "Success",
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: (error as Error).message || "Something Wen't wrong",
    });
  }
}
