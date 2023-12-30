"use server";
import Stripe from "stripe";
import { ITransaction } from "app/send/page";
import { redirect } from "next/navigation";
import axios from "axios";
import User from "app/models/User";
import Transaction from "app/models/Transaction";
import connectDB from "app/lib/connect-db";

export const recordTransaction = async (transaction: ITransaction) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: transaction.receiver.name,
          },
          unit_amount: Number(transaction.amount) * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      receiverEmail: transaction.receiver.email,
      receiverName: transaction.receiver.name,
      senderEmail: transaction.sender.email,
      senderName: transaction.sender.name,
      amount: transaction.amount,
      comment: transaction.comment,
      transactionRef: transaction.transactionRef,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/send/complete?success=true&ref=${transaction.transactionRef}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/send?canceled=true`,
  });

  redirect(session.url!);
};

export const createTransaction = async (transaction: ITransaction) => {
  await connectDB();

  // CHECK ACCOUNT BALANCE
  const userAcc = await User.findOne({ email: transaction.sender.email });
  if (userAcc.account.demo.balance < transaction?.amount!) {
    return {
      error: true,
      status: 404,
      message: "Insufficient funds",
    };
  }

  // CREATE TRANSACTION
  const res = await axios.post("/transactions", transaction);

  // UPDATE SENDER ACCOUNT BALANCE
  const senderAcc = await User.findOne({
    email: transaction.sender.email,
  });
  if (senderAcc)
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
};
