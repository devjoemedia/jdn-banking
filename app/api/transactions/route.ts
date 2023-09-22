import connectDB from "../../lib/connect-db";
import Transaction from "../../models/Transaction";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    await connectDB();
    const transactions = await Transaction.find();

    return NextResponse.json({
      error: false,
      status: 201,
      message: "Success",
      transactions,
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
    const transaction = await Transaction.create({ ...res });

    return NextResponse.json({
      error: false,
      status: 201,
      message: "Success",
      transaction,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      status: 400,
      message: (error as Error).message || "Something Wen't wrong",
    });
  }
}
