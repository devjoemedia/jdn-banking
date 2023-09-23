import User from "../../models/User";
import connectDB from "../../lib/connect-db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { reference: string } }
) {
  try {
    await connectDB();

    const reference = params.reference;
    const user = await User.findOne({ email: reference });

    console.log(user)
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

export async function PATCH(
  request: NextRequest,
  response: NextResponse,
  { params }: { params: { reference: string } }
) {
  try {
    await connectDB();

    const reference = params.reference;
    const user = await User.findByIdAndUpdate(reference, response.json());

    return NextResponse.json({
      error: false,
      status: 200,
      message: "user updated",
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

export async function DELETE(
  request: NextRequest,
  response: NextResponse,
  { params }: { params: { reference: string } }
) {
  try {
    await connectDB();

    const reference = params.reference;
    await User.findByIdAndDelete(reference);

    return NextResponse.json({
      error: false,
      status: 200,
      message: "user deleted",
    });
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
      error: true,
      status: 400,
    });
  }
}
