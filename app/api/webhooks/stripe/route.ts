import { hash, compare } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import User from "app/models/User";
import connectDB from "app/lib/connect-db";
import Transaction from "app/models/Transaction";
import { getServerSession } from "next-auth";
import stripe from "stripe";

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
    await connectDB();

    // CHECK ACCOUNT BALANCE
    const userAcc = await User.findOne({ email: metadata?.senderEmail });
    if (userAcc.account.demo.balance < metadata?.amount!) {
      return NextResponse.json({
        error: true,
        status: 404,
        message: "Insufficient funds",
      });
    }

    // CREATE TRANSACTION
    const transaction = await Transaction.create({
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
      receivingBank: "",
      paymentMethod: "",
      paymentDate: Date.now(),
      status: "Completed",
    });

    // UPDATE SENDER ACCOUNT BALANCE
    const senderAcc = await User.findOne({
      email: transaction.sender.email,
    });
    await User.updateOne(
      { email: transaction.sender.email },
      {
        $set: {
          "account.demo.balance":
            senderAcc.account.demo.balance - transaction.amount,
        },
      }
    );

    // UPDATE RECEIVER ACCOUNT BALANCE
    const receiverAcc = await User.findOne({
      email: transaction.receiver.email,
    });
    if (receiverAcc) {
      await User.updateOne(
        { email: transaction.receiver.email },
        {
          $set: {
            "account.demo.balance":
              receiverAcc.account.demo.balance + transaction.amount,
          },
        }
      );
    }

    return NextResponse.json({
      error: false,
      status: 201,
      message: "Success",
      transaction,
    });
  }
}
