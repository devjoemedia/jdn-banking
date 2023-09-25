import mongoose, { Schema } from "mongoose";

type Identifier = {
  name: string;
  email: string;
};
interface INotification {
  amount: number;
  comment: string;
  notificationRef: string;
  receiver: Identifier;
  sender: Identifier;
  receivingBank?: string;
  paymentMethod?: string;
  paymentDate: number;
  status: string;
  createdAt: number;
}

const notificationSchema = new Schema<INotification>({
  amount: Number,
  comment: String,
  notificationRef: String,
  receiver: {},
  sender: {},
  receivingBank: { type: String, default: "JDN Bank" },
  paymentMethod: { type: String, default: "MOCK::PAYMENT" },
  paymentDate: { type: Number, default: Date.now() },
  status: String,
  createdAt: { type: Number, default: Date.now() },
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
export default Notification;
