import mongoose, { Schema, Document, model } from "mongoose";
interface blogs extends Document {
  title: string;
  content: string;
  imageUrl: string;
}
const blogSchema: Schema<blogs> = new Schema(
  {
    title: String,
    content: String,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);
const blogsModel = mongoose.model<blogs>("blogs", blogSchema);
export { blogsModel, blogs };
