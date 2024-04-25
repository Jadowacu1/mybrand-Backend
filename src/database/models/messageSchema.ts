import mongoose, { Schema, Document, model } from "mongoose";
interface messages extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string[];
}
const messageSchema: Schema<messages> = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  message: { type: [String] },
});
const messagesModel = mongoose.model<messages>("messages", messageSchema);
export { messagesModel };
