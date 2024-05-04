import { Request, Response } from "express";
import {
  insertIntoDb,
  exstingUser,
  allUsers,
  deletingUser,
  verify,
  updateStatus,
  verifiedAcc,
  verifiedUser,
} from "../repository/userRepository";

import { usersModel } from "../../../database/models/usersSchema";
import { userValidation } from "../../../utilities/input";
import bcrypt from "bcrypt";

import bycrpt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer, { Transporter } from "nodemailer";

const TOKEN_SECRET = "NeverTrustPeople";

const createUser = async (req: Request, res: Response) => {
  try {
    function generateRandomToken() {
      let token = "";
      for (let i = 0; i < 6; i++) {
        token += Math.floor(Math.random() * 10);
      }
      return token;
    }
    const { email, password, confirm } = req.body;
    const role: string = "client";
    const verified = "No";
    const otp = generateRandomToken();
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

    const transporter: Transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "jadowacu@gmail.com",
        pass: "rytryjyoxuxnhrym",
      },
    });
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: {
          name: `JadoForge`,
          address: `${email}`,
        },
        to: `${email}`, // list of receivers
        subject: "Email Verification Code", // Subject line
        // text: , // plain text body
        html: `<b>Your Email verificaton code is: <h2> ${otp} </h2>Don't share this code</b>`,
      });
      console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);

    const Password = await bcrypt.hash(password, 10);
    const data = await insertIntoDb({
      email,
      Password,
      role,
      otp,
      verified,
    });
    return res.status(200).json("Check Your Email Inbox");
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
    const verifiedUsers = await verifiedUser(email);
    if (!verifiedUsers) {
      return res.status(400).json("You account is not verified");
    }
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

const verification = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const verifiedUser = await verifiedAcc(email);
  if (!verifiedUser) {
    const data = await verify(email, otp);

    if (data) {
      const update = await updateStatus(email, otp);
      if (update) {
        return res.status(200).json("Account is now verified");
      }
    } else {
      return res.status(400).json("No User or Invalid Token");
    }
  } else {
    return res.status(400).json("Already Verified");
  }
};
export { createUser, login, viewUsers, deleteUser, verification };
