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
import { htmlBody } from '../utils/emails/htmlBody';
import sendEmail from '../utils/emails/sendEmail';

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

  async sendEmail(email: string) {
    const findUserEmail =
      await prismaConnect.users.findUnique({
        where: { email },
      });

    if (!findUserEmail) {
      throw new ConflitError('Email not found');
    }

    const newPassword = Math.random()
      .toString(36)
      .slice(-8);

    const hashedPassword = await hash(
      newPassword.toString(),
      10
    );

    await prismaConnect.users.update({
      where: { id: findUserEmail.id },
      data: { password: hashedPassword },
    });

    const html = htmlBody(newPassword, true);

    await sendEmail({
      to: email,
      subject: 'Confirm your token',
      html,
    });

    return;
  }
}

export default new userService();
