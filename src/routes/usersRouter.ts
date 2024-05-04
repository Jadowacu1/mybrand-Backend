import Router from "express";
import {
  createUser,
  login,
  viewUsers,
  deleteUser,
  verification,
} from "../modules/users/controllers/userControllers";
import { admin, client } from "../utilities/tokenVerify";
const usersRouter = Router();
usersRouter.post("/registration", createUser);
usersRouter.post("/userVerification", verification);
usersRouter.post("/login", login);
usersRouter.get("/viewUsers", admin, viewUsers);
usersRouter.delete("/deleteUser/:userId", admin, deleteUser);

export default usersRouter;
