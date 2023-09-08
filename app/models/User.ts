import mongoose, { Schema } from "mongoose";

interface IUser {
  name: string;
  email: string;
  photo: string;
  password: number;
  banks: [Schema.Types.ObjectId];
  createdAt: string;
}

const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  photo: String,
  password: String,
  banks: [{ type: Schema.Types.ObjectId, ref: "Bank" }],
  createdAt: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
