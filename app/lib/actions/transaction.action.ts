"use server";
import Stripe from "stripe";
import { ITransaction } from "app/send/page";
import { redirect } from "next/navigation";

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
      comment: transaction.comment
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/send?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/send?canceled=true`,
  });

  redirect(session.url!);
};
