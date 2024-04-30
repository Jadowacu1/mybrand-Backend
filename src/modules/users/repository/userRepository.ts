import { usersModel } from "../../../database/models/usersSchema";

const insertIntoDb = async (body: any) => {
  return await usersModel.create(body);
};

const exstingUser = async (email: string) => {
  return await usersModel.findOne({ email: email, verified: "yes" });
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

const verify = async (otp: String, email: String) => {
  return usersModel.find({ email: email, otp: otp });
};
const updateStatus = async (email: string, otp: string) => {
  return usersModel.updateOne(
    { email: email, otp: otp },
    { $set: { verified: "yes" } }
  );
};
export {
  insertIntoDb,
  exstingUser,
  allUsers,
  deletingUser,
  verify,
  updateStatus,
};
