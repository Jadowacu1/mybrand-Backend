import Router from "express";
import {
  createUser,
  login,
  viewUsers,
  deleteUser,
  verification,
} from "../modules/users/controllers/userControllers";
import { validateToken } from "../utilities/tokenVerify";
const usersRouter = Router();
usersRouter.post("/registration", createUser);
usersRouter.post("/userVerification", verification);
usersRouter.post("/login", login);
usersRouter.get("/viewUsers", validateToken, viewUsers);
usersRouter.delete("/deleteUser/:userId", validateToken, deleteUser);

export default usersRouter;
