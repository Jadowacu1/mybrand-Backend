import { Request, Response } from "express";
import { messageValidation } from "../../../utilities/input";
import {
  existingEmail,
  pushingMessage,
  recordingMessage,
  view,
  deletingMessage,
} from "../repository/messageRepository";
import nodemailer, { Transporter } from "nodemailer";

const recordMessage = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phoneNumber, message } = req.body;
    const { error } = messageValidation.validate({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    });
    if (error) {
      return res.status(400).json((error.details[0] as any).message);
    }

    const one = await existingEmail(email);
    if (one) {
      const update = await pushingMessage(email, message);
      return res.status(200).json("Your message is sent");
    } else {
      const data = await recordingMessage({
        firstName,
        lastName,
        email,
        phoneNumber,
        message,
      });
      if (data) {
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
              name: `${firstName}`,
              address: `${email}`,
            },
            to: "jadowacu@gmail.com", // list of receivers
            subject: "My Brand FeedBack", // Subject line
            // text: , // plain text body
            html: `<b>${message}</b>`, // html body
          });
          console.log("Message sent: %s", info.messageId);
        }

        main().catch(console.error);
        return res.status(200).json("Your message is sent");
      } else {
        return res.status(400).json("failed");
      }
    }
  } catch (err) {
    return res.status(501).json(err);
  }
};

const viewMessages = async (req: Request, res: Response) => {
  // const role = req.role;
  const data = await view();
  if (data) {
    // res.send(role);
    return res.status(200).json(data);
  }
  return res.status(400).json("Message Not Availble");
};

const deleteMessage = async (req: Request, res: Response) => {
  const { messageId } = req.params;
  const result = await deletingMessage(messageId);
  if (result.deletedCount === 1) {
    return res.status(200).json("Message is Deleted");
  } else {
    return res.status(400).json("Failed");
  }
};

export { recordMessage, viewMessages, deleteMessage };
