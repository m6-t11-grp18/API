import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { IUserCreate } from '../interfaces';
import prismaConnect from '../utils/dataBaseClient';
import { ConflitError } from '../utils/error';

class userService {
  async create({
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

    return user;
  }

  async update() {}
}

export default new userService();
