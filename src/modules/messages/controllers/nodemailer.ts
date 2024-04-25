import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const sendEmail = async (
  name: string,
  email: string,
  message: string
): Promise<void> => {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "mugishaelvis456@gmail.com",
        pass: `${process.env.PASSWORD}`,
      },
    });
    const mailOptions = {
      from: email,
      to: "mugishaelvis456@gmail.com",
      subject: "Portfolio Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("An error occurred while sending the email.");
  }
};
