import mongoose, { Schema, Document, model } from "mongoose";
interface users extends Document {
  email: { type: string; required: true };
  Password: string;
  role: string;
  otp: string;
  verified: string;
}
const userSchema: Schema<users> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  role: String,
  otp: String,
  verified: String,
});
const usersModel = mongoose.model<users>("Users", userSchema);
export { usersModel };
