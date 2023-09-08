import Contact from "../../models/Contact";
import connectDB from "../../lib/connect-db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { reference: string } }
) {
  try {
    await connectDB();

    const reference = params.reference;
    const contact = await Contact.findOne({ _id: reference });

    return NextResponse.json({ status: 200, contact });
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
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
    const contact = await Contact.findByIdAndUpdate(reference, response.json());

    return NextResponse.json({ status: 200, contact });
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
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
    await Contact.findByIdAndDelete(reference);

    return NextResponse.json({ status: 200, message: "contact deleted" });
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
      status: 400,
    });
  }
}
