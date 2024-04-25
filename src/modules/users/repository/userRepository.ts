import { usersModel } from "../../../database/models/usersSchema";

const insertIntoDb = async (body: any) => {
  return await usersModel.create(body);
};

const exstingUser = async (email: string) => {
  return await usersModel.findOne({ email });
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
export { insertIntoDb, exstingUser, allUsers, deletingUser };
