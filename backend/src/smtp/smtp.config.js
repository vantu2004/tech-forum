import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // tài khoản Gmail, ví dụ: myemail@gmail.com
    pass: process.env.GMAIL_APP_PASS, // App Password (16 ký tự)
  },
});
