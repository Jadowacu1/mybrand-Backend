import { messagesModel } from "../../../database/models/messageSchema";
const recordingMessage = async (body: any) => {
  return await messagesModel.create(body);
};
const existingEmail = async (email: any) => {
  return await messagesModel.findOne({ email });
};

const pushingMessage = async (email: any, message: string) => {
  return await messagesModel.updateOne(
    { email },
    { $push: { message: message } }
  );
};

const view = async () => {
  return messagesModel.find();
};

const deletingMessage = async (messageId: string) => {
  return await messagesModel.deleteOne({ _id: messageId });
};
export {
  recordingMessage,
  existingEmail,
  pushingMessage,
  view,
  deletingMessage,
};
