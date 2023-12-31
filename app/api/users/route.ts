import User from "app/models/User";
import connectDB from "app/lib/connect-db";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/authOptions";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const account = session?.user;

    if (!session || !account) {
      return NextResponse.json({
        error: true,
        status: 404,
        message: "You are not authenticated",
      });
    }

    const user = await User.findOne({ email: account?.email });

    return NextResponse.json({
      error: false,
      status: 200,
      message: "success",
      user,
    });
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
      error: true,
      status: 404,
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
