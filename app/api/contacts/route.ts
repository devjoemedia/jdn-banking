import connectDB from "../../lib/connect-db";
import Contact from "../../models/Contact";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    await connectDB();
    const contacts = await Contact.find();
  
    return NextResponse.json({
      status: 201,
      message: "Success",
      contacts
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
    const contact = await Contact.create({ ...res });

    return NextResponse.json({
      status: 201,
      message: "Success",
      contact
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: (error as Error).message || "Something Wen't wrong",
    });
  }
}
