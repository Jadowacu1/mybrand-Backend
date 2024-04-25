// blogController.ts
import { Request, Response, NextFunction } from "express";
import { cloudinary } from "../../../utilities/cloudinary";
import { FilterQuery, UpdateQuery, UpdateWriteOpResult } from "mongoose";
import {
  createBlog,
  readBlogs,
  deleteTask,
  readSingle,
  updateBlog,
} from "../repository/blogsRepo";
import multer from "multer";
import { blogsModel } from "../../../database/models/blogSchema";

const upload = multer({ dest: "uploads/" });

const creatingBlog = async (req: Request, res: Response) => {
  try {
    upload.single("image")(req, res, async (err: any) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(400).json({ message: "File upload failed" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const newBlogPost = {
          title: req.body.title,
          content: req.body.content,
          imageUrl: result.secure_url,
        };
        const savedBlog = await createBlog(newBlogPost);
        res.status(201).json(savedBlog);
      } catch (uploadError) {
        console.error("Error uploading image to Cloudinary:", uploadError);
        res.status(500).json({ message: "Image upload failed" });
      }
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const readingBlogs = async (req: Request, res: Response) => {
  const data = await readBlogs();
  if (data) {
    return res.status(200).json(data);
  }
};

const deletingBlog = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await deleteTask(blogId);
  if (result.deletedCount === 1) {
    return res.status(200).json("Blog post deleted successfully");
  } else {
    return res.status(400).json("Things failed");
  }
};

const readingSingle = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await readSingle(blogId);
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json("Not found");
  }
};

const updatingBlog = async (req: Request, res: Response) => {
  try {
    upload.single("image")(req, res, async (err: any) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(400).json({ message: "File upload failed" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      try {
        const result = await cloudinary.uploader.upload(req.file.path);

        const title = req.body.title;
        const content = req.body.content;
        const imageUrl = result.secure_url;
        const { blogId } = req.params;
        const savedBlog = await blogsModel.updateOne(
          { _id: blogId },
          { $set: { title: title, content: content, imageUrl: imageUrl } }
        );

        if (savedBlog.modifiedCount === 1) {
          return res.status(201).json("Blog is updated");
        } else {
          return res.status(201).json("something went wrong");
        }
      } catch (uploadError) {
        console.error("Error uploading image to Cloudinary:", uploadError);
        res.status(500).json({ message: "Image upload failed" });
      }
    });
  } catch (err) {
    console.error(err);
  }
};
export {
  creatingBlog,
  readingBlogs,
  deletingBlog,
  updatingBlog,
  readingSingle,
};
