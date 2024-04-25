import Router from "express";
import {
  deleteMessage,
  recordMessage,
  viewMessages,
} from "../modules/messages/controllers/messageController";
import { validateToken } from "../utilities/tokenVerify";
const messageRouter = Router();
messageRouter.post("/recordingMessage", recordMessage);
messageRouter.get("/viewMessages", validateToken, viewMessages);
messageRouter.delete(
  "/deletingMessage/:messageId",
  validateToken,
  deleteMessage
);

export default messageRouter;
