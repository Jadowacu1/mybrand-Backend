import { usersModel } from "../../../database/models/usersSchema";

const insertIntoDb = async (body: any) => {
  return await usersModel.create(body);
};

const verifiedUser = async (email: string) => {
  return await usersModel.findOne({ email: email, verified: "yes" });
};
const exstingUser = async (email: string) => {
  return await usersModel.findOne({ email: email });
};
interface query {
  role: string;
}
const allUsers = async (query: query) => {
  return await usersModel.find(query);
};

const deletingUser = async (userId: string) => {
  return await usersModel.deleteOne({ _id: userId });
};

const verify = async (email: String, otp: String) => {
  return usersModel.findOne({ email: email, otp: otp });
};
const verifiedAcc = async (email: String) => {
  return usersModel.findOne({ email: email, verified: "yes" });
};
const updateStatus = async (email: string, otp: string) => {
  return usersModel.updateOne({ email: email }, { $set: { verified: "yes" } });
};
export {
  insertIntoDb,
  exstingUser,
  allUsers,
  deletingUser,
  verify,
  updateStatus,
  verifiedAcc,
  verifiedUser,
};
