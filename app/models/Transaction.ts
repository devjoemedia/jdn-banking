import mongoose, { Schema } from "mongoose";

type Payer = {
  name: string;
  email: string;
};
interface ITransaction {
  amount: number;
  comment: string;
  transactionRef: string;
  receiver: Payer;
  sender: Payer;
  receivingBank?: string;
  paymentMethod?: string;
  paymentDate: number;
  status: string;
  createdAt: number;
}

const transactionSchema = new Schema<ITransaction>({
  amount: Number,
  comment: String,
  transactionRef: String,
  receiver: {},
  sender: {},
  receivingBank: { type: String, default: "JDN Bank" },
  paymentMethod: { type: String, default: "MOCK::PAYMENT" },
  paymentDate: { type: Number, default: Date.now() },
  status: String,
  createdAt: { type: Number, default: Date.now() },
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
export default Transaction;
