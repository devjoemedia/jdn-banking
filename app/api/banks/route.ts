import connectDB from "../../lib/connect-db";
import Bank from "../../models/Bank";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    await connectDB();
    const banks = await Bank.find();

    return NextResponse.json({
      status: 201,
      message: "Success",
      banks,
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
    const bank = await Bank.create({ ...res });

    return NextResponse.json({
      status: 201,
      message: "Success",
      bank
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: (error as Error).message || "Something Wen't wrong",
    });
  }
}
