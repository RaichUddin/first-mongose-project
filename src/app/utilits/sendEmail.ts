/* eslint-disable prettier/prettier */

import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // true for 465, false for other ports
    auth: {
      user: 'rabbitrade10@gmail.com',
      pass: 'ikww twkb inni obbo',
    },
  });
  await transporter.sendMail({
    from: 'rabbitrade10@gmail.com', // sender address
    to, // list of receivers
    subject: 'Hello ✔Reset your password within 10 mins Thank you', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
