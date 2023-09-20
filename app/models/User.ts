import mongoose, { Schema } from "mongoose";

interface IUser {
  name: string;
  email: string;
  photo?: string;
  password: number;
  banks: [Schema.Types.ObjectId];
  accountType: string;
  account: {
    demo: {
      balance: number;
    };
    real: {
      balance: number;
    };
  };
  createdAt: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  photo: String,
  password: String,
  banks: [{ type: Schema.Types.ObjectId, ref: "Bank" }],
  accountType: { type: String, default: "demo" }, // demo or real
  account: {
    demo: {
      balance: { type: Number, default: 10000 },
    },
    real: {
      balance: { type: Number, default: 0 },
    },
  },
  createdAt: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
