import Router from "express";
import {
  creatingBlog,
  readingBlogs,
  deletingBlog,
  updatingBlog,
  readingSingle,
} from "../modules/blogs/controller/blogController";
import { validateToken } from "../utilities/tokenVerify";
import { readSingle } from "../modules/blogs/repository/blogsRepo";
const blogsRouter = Router();
blogsRouter.post("/create", creatingBlog);
blogsRouter.get("/read", readingBlogs);
blogsRouter.get("/read/:blogId", readingSingle);
blogsRouter.delete("/delete/:blogId", validateToken, deletingBlog);
blogsRouter.put("/edit/:blogId", validateToken, updatingBlog);
export default blogsRouter;
