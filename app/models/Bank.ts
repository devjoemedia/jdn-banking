import mongoose, { Schema } from "mongoose";

interface IBank {
  name: string;
  createdAt: number;
  accountNumber: number;
  user: Schema.Types.ObjectId;
  balance: number;
}

const bankSchema = new Schema<IBank>({
  balance: { type: Number, default: 0 },
  name: String,
  accountNumber: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Number, default: Date.now() },
});

const Bank = mongoose.models.Bank || mongoose.model("Bank", bankSchema);
export default Bank;
