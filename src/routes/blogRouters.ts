import Router from "express";
import {
  creatingBlog,
  readingBlogs,
  deletingBlog,
  updatingBlog,
  readingSingle,
} from "../modules/blogs/controller/blogController";
import { admin, client } from "../utilities/tokenVerify";
import { readSingle } from "../modules/blogs/repository/blogsRepo";
const blogsRouter = Router();
blogsRouter.post("/create", admin, creatingBlog);
blogsRouter.get("/read", client, readingBlogs);
blogsRouter.get("/read/:blogId", client, readingSingle);
blogsRouter.delete("/delete/:blogId", admin, deletingBlog);
blogsRouter.put("/edit/:blogId", admin, updatingBlog);
export default blogsRouter;
