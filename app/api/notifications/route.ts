import connectDB from "../../lib/connect-db";
import Notification from "../../models/Notification";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/authOptions";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !user) {
      return NextResponse.json({
        error: true,
        status: 404,
        message: "You are not authenticated",
      });
    }
    const notifications = await Notification.find({
      $or: [{ user: user?.email }, { user: user?.email }],
    }).sort( { createdAt: -1 } );

    return NextResponse.json({
      error: false,
      status: 201,
      message: "Success",
      notifications,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      status: 400,
      message: (error as Error).message || "Something Wen't wrong",
    });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const res = await request.json();
    await connectDB();
    const notification = await Notification.create({ ...res });

    return NextResponse.json({
      error: false,
      status: 201,
      message: "Success",
      notification,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      status: 400,
      message: (error as Error).message || "Something Wen't wrong",
    });
  }
}
