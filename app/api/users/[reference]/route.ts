import User from "../../../models/User";
import connectDB from "../../../lib/connect-db";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/authOptions";

export async function GET(
  request: NextRequest,
  { params }: { params: { reference: string } }
) {
  try {
    await connectDB();

    const reference = params.reference;
    const user = await User.findOne({ email: reference });

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
  { params }: { params: { reference: string } }
) {
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

    const reference = params.reference;
    const body = await request.json();
    const user = await User.updateOne(
      { email: account?.email },
      { name: body?.name, bio: body?.bio, phone: body?.phone }
    );

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
