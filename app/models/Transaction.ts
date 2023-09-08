import mongoose, { Schema } from "mongoose";

interface ITransaction {
  amount: number;
  comment: string;
  transactionRef: string;
  receiver: string;
  sender: string;
  receivingAccount: string;
  receivingBank: string;
  paymentMethod: string;
  accountNumber: string;
  paymentDate: string;
  status: string;
}

const transactionSchema = new Schema<ITransaction>({
  amount: Number,
  comment: String,
  transactionRef: String,
  receiver: String,
  sender: String,
  receivingAccount: String,
  receivingBank: String,
  paymentMethod: String,
  accountNumber: String,
  paymentDate: String,
  status: String,
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
export default Transaction;
