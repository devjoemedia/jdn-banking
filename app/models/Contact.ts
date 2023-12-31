import mongoose, { Schema } from "mongoose";

interface IContact {
  name: string;
  email: string;
  phone?: string;
  user: string;
  createdAt: number;
}

const contactSchema = new Schema<IContact>({
  name: String,
  email: String,
  phone: String,
  user: String,
  createdAt: { type: Number, default: Date.now() },
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export default Contact;
