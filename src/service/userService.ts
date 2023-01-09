import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import {
  IEmailRequest,
  IUserCreate,
  IUserDelete,
  IUserEdit,
} from '../interfaces/index';
import { excludeResponseMiddleware } from '../middleware/excludeResponseMiddleware';
import prismaConnect from '../utils/dataBaseClient/index';
import {
  ConflitError,
  NotFoundError,
} from '../utils/error/index';
import authService from './authService';
import { v4 as uuid } from 'uuid';
import { createTransport } from 'nodemailer';
import 'dotenv/config';

class userService {
  async create({
    ip,
    name,
    email,
    password,
    cpf,
    phone,
    birth,
    descripition,
  }: IUserCreate) {
    const findUserEmail =
      await prismaConnect.users.findUnique({
        where: { email },
      });

    if (findUserEmail) {
      throw new ConflitError(
        'this email is already registered'
      );
    }

    const hashedPassword = await hash(
      password.toString(),
      10
    );

    const user = await prismaConnect.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        cpf,
        phone,
        birth,
        descripition,
        isAdm: false,
      },
      include: { userAddress: true },
    });

    const accessToken = await authService.login(
      email,
      password,
      ip
    );

    await prismaConnect.userSessions.create({
      data: {
        UserId: user.id,
        ip,
        type: 'user: create user',
      },
    });

    return {
      user,
      accessToken,
    };
  }

  async readAll() {
    const AllUsers = await prismaConnect.users.findMany();
    if (!AllUsers) {
      throw new NotFoundError('No User Found.');
    }
    return AllUsers;
  }

  async update({
    id,
    name,
    email,
    password,
    phone,
    descripition,
  }: IUserEdit) {
    const updateUser = await prismaConnect.users.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
        phone,
        descripition,
      },
    });

    return { updateUser };
  }

  async delete({ userId }: IUserDelete) {
    const deleteUser = await prismaConnect.users.delete({
      where: {
        id: userId,
      },
    });

    return { response: 'User deleted with success.' };
  }

  async sendEmail({ subject, text, to }: IEmailRequest) {
      //Fazendo a conexão com o nosso servidor de SMPT
  //Para a conexão funcionar, precisamos puxar o usuário e senha do outlook que foram colocados no .env
  const transporter = createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  //Com a conexão feita, usamos o método sendMail
  //O método fará o envio do email de acordo com os parâmetros passados
  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: text,
    })
    .then(() => {
      console.log('Email send with success');
    })
    .catch((err) => {
      console.log(err);
      throw new Error(
        'Error sending email, try again later'
      );
    });
  }
}

export default new userService();
