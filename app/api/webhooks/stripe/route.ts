import { hash, compare } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import User from "app/models/User";
import connectDB from "app/lib/connect-db";
import Transaction from "app/models/Transaction";
import { getServerSession } from "next-auth";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.text();

  try {
    const sig = request.headers.get("stripe-signature") as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const { id, amount_total, metadata } = event.data.object;
        await connectDB();

        // CHECK ACCOUNT BALANCE
        const userAcc = await User.findOne({ email: metadata?.sender });
        if (userAcc.account.demo.balance < amount_total) {
          return NextResponse.json({
            error: true,
            status: 404,
            message: "Insufficient funds",
          });
        }

        // CREATE TRANSACTION
        const transaction = await Transaction.create({
          amount: Number(metadata.amount),
          comment: metadata.comment,
          transactionRef: id,
          receiver: {
            name: metadata.receiverName,
            email: metadata.receiverEmail,
          },
          sender: {
            name: metadata.senderName,
            email: metadata.senderEmail,
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
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    return NextResponse.json({
      error: false,
      status: 400,
      message: `Webhook Error: ${(error as Error).message}`,
    });
  }
}
