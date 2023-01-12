import "dotenv/config";

import { createTransport } from "nodemailer";
import { IEmailRequest } from "../../interfaces";
import { ErrorHandler } from "../error";

const sendEmail = async ({ to, subject, html, text }: IEmailRequest) => {
  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html: html || text,
    })
    .then(() => {
      console.log("email send with sucess");
    })
    .catch((error) => {
      throw new ErrorHandler(`An error has occurred ${error}`, 403);
    });
};

export default sendEmail;