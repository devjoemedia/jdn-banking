import mongoose, { Schema } from "mongoose";

interface IBank {
  name: string;
  createdAt: number;
  accountNumber: number;
  user: string;
  balance: number;
}

const bankSchema = new Schema<IBank>({
  balance: { type: Number, default: 0 },
  name: String,
  accountNumber: String,
  user: { type: String  },
  createdAt: { type: Number, default: Date.now() },
});

const Bank = mongoose.models.Bank || mongoose.model("Bank", bankSchema);
export default Bank;
