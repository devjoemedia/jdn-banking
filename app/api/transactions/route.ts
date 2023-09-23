import { getServerSession } from "next-auth";
import connectDB from "../../lib/connect-db";
import Transaction from "../../models/Transaction";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "app/lib/authOptions";
import User from "app/models/User";

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
    const transactions = await Transaction.find({
      $or: [{ "sender.email": user?.email }, { "receiver.email": user?.email }],
    }).sort({ createdAt: -1 });

    const sent = await Transaction.find({
      $or: [{ "sender.email": user?.email }],
    }).sort({ createdAt: -1 });
    const received = await Transaction.find({
      $or: [{ "receiver.email": user?.email }],
    }).sort({ createdAt: -1 });

    const totalSent = sent.reduce((acc, cur) => acc + cur.amount, 0);
    const totalReceived = received.reduce((acc, cur) => acc + cur.amount, 0);
    const totalTransactions = transactions.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );

    return NextResponse.json({
      error: false,
      status: 201,
      message: "Success",
      transactions,
      totalSent,
      totalReceived,
      totalTransactions,
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
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !user) {
      return NextResponse.json({
        error: true,
        status: 404,
        message: "You are not authenticated",
      });
    }

    // CHECK ACCOUNT BALANCE
    const userAcc = await User.findOne({ email: user?.email });
    if (userAcc.account.demo.balance < res.amount) {
      return NextResponse.json({
        error: true,
        status: 404,
        message: "Insufficient funds",
      });
    }

    // CREATE TRANSACTION
    const transaction = await Transaction.create({ ...res });
    console.log({ transaction, res });

    // UPDATE SENDER ACCOUNT BALANCE
    const senderAcc = await User.findOne({ email: transaction.sender.email });
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
  } catch (error) {
    return NextResponse.json({
      error: true,
      status: 400,
      message: (error as Error).message || "Something Wen't wrong",
    });
  }
}
