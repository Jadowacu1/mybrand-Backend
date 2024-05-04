import Router from "express";
import {
  deleteMessage,
  recordMessage,
  viewMessages,
} from "../modules/messages/controllers/messageController";
import { admin } from "../utilities/tokenVerify";
const messageRouter = Router();
messageRouter.post("/recordingMessage", recordMessage);
messageRouter.get("/viewMessages", admin, viewMessages);
messageRouter.delete("/deletingMessage/:messageId", admin, deleteMessage);

export default messageRouter;
