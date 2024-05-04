import Router from "express";
import usersRouter from "./usersRouter";
import messageRouter from "./messageRoutes";
import blogsRouter from "./blogRouters";
// import { admin,client } from "../utilities/tokenVerify";
import { connection } from "../database/config/connection";

connection();
const router = Router();
router.use("/users", usersRouter);
router.use("/messages", messageRouter);
router.use("/blogs", blogsRouter);

export default router;
