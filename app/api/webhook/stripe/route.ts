import { hash, compare } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import User from "app/models/User";
import connectDB from "app/lib/connect-db";
import Transaction from "app/models/Transaction";
import { getServerSession } from "next-auth";
import stripe from "stripe";
import { createTransaction } from "app/lib/actions/transaction.action";
import axios from "axios";

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    return NextResponse.json({
      error: false,
      status: 400,
      message: `Webhook Error: ${(error as Error).message}`,
    });
  }
  // Handle the event
  if (event.type == "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;
    const transaction = {
      amount: Number(metadata?.amount as string),
      comment: metadata?.comment as string,
      transactionRef: metadata?.transactionRef as string,
      receiver: {
        name: metadata?.receiverName as string,
        email: metadata?.receiverEmail as string,
      },
      sender: {
        name: metadata?.senderName as string,
        email: metadata?.senderEmail as string,
      },
      receivingBank: "JDN Bank",
      paymentMethod: "MOCK::PAYMENT",
      paymentDate: Date.now(),
      status: "Completed",
    };

  const {data} = await axios.post("/api/transactions", transaction);

    return NextResponse.json({
      error: false,
      status: 201,
      message: "Success",
      transaction: data?.transaction,
    });
  }
}
