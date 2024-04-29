import { Request, Response } from "express";
import {
  insertIntoDb,
  exstingUser,
  allUsers,
  deletingUser,
} from "../repository/userRepository";

import { usersModel } from "../../../database/models/usersSchema";
import { userValidation } from "../../../utilities/input";
import bcrypt from "bcrypt";

import bycrpt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const TOKEN_SECRET = "NeverTrustPeople";

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, confirm } = req.body;
    const role: string = "client";
    const { error } = userValidation.validate({
      email,
      password,
      confirm,
    });
    if (error) {
      return res.status(400).json((error.details[0] as any).message);
    }
    const one = await exstingUser(email);
    if (one) {
      return res.status(409).json("Email in use");
    }
    const Password = await bcrypt.hash(password, 10);
    const data = await insertIntoDb({ email, Password, role });
    return res.status(200).json("Account Is Created");
  } catch (error) {
    return res.status(500).json({ status: 500, error: JSON.stringify(error) });
  }
};

const login = async (req: Request, res: Response) => {
  // try {
  const { email, password } = req.body;
  const fetchUser = await exstingUser(email);
  if (!fetchUser) {
    return res.status(400).json("Email or Password is incorrect");
  }
  if (fetchUser) {
    const fetchedPassword = fetchUser.Password;
    const role = fetchUser.role;
    bycrpt.compare(password, fetchedPassword, (err, results) => {
      if (results) {
        const token = jwt.sign({ email, password, role }, TOKEN_SECRET, {
          expiresIn: 60 * 120,
        });
        return res.json(token);
      } else {
        return res.status(400).json("Email or Password is incorrect");
      }
    });
  }
  // }
  //  catch (error) {
  //   return res.status(500).json({ error: "Internal Server Error" });
  // }
};

const viewUsers = async (req: Request, res: Response) => {
  const query = { role: "client" };
  const results = await allUsers(query);
  if (results) {
    return res.status(200).json(results);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const results = await deletingUser(userId);
  if (results.deletedCount === 1) {
    return res.status(200).json("User is Deleted");
  } else {
    return res.status(400).json("Failed");
  }
};
export { createUser, login, viewUsers, deleteUser };
