import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { IUserCreate } from '../interfaces/index';
import { excludeMiddleware } from '../middleware/excludeMiddleware';
import prismaConnect from '../utils/dataBaseClient/index';
import { ConflitError } from '../utils/error/index';
import authService from './authService';

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
      user: excludeMiddleware(user, ['password', 'cpf']),
      accessToken,
    };
  }

  async update() {}
}

export default new userService();
