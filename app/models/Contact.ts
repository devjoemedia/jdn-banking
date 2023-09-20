import mongoose, { Schema } from "mongoose";

interface IContact {
  name: string;
  email: string;
  phone?: string;
  user: string;
  // user: Schema.Types.ObjectId;
  createdAt: number;
}

const contactSchema = new Schema<IContact>({
  name: String,
  email: String,
  phone: String,
  user: String,
  // user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Number, default: Date.now() },
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export default Contact;
