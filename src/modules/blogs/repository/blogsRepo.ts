import { any } from "joi";
import { blogsModel } from "../../../database/models/blogSchema";
import { FilterQuery, UpdateQuery, UpdateWriteOpResult } from "mongoose";
const createBlog = async (blogPost: any) => {
  return await blogsModel.create(blogPost);
};
const readBlogs = async () => {
  return await blogsModel.find();
};
const readSingle = async (blogId: string) => {
  return await blogsModel.findOne({ _id: blogId });
};

const deleteTask = async (blogId: string) => {
  return await blogsModel.deleteOne({ _id: blogId });
};

const updateBlog = async (blogId: string, body: any) => {
  return blogsModel.updateOne({ _id: blogId }, body);
};
export { createBlog, readBlogs, deleteTask, readSingle, updateBlog };
