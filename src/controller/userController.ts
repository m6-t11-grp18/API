import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import {
  IEmailRequest,
  IUserCreate,
  IUserDelete,
  IUserEdit,
} from '../interfaces/index';
import { excludeResponseMiddleware } from '../middleware/excludeResponseMiddleware';
import userService from '../service/userService';
import prismaConnect from '../utils/dataBaseClient';
// import authService from '../service/authService';
/*
envio de imagens:
O serviço tem um service próprio, já pronto, 
só guardar numa variável ele responde um array strings das urls´s, 

    Decidir se a rota vai ser junta ou separada.

*/

class userController {
  async create(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      cpf,
      phone,
      birth,
      descripition,
    }: IUserCreate = req.body;

    console.log("name -->", name)


    const ip = req.ip;

    const data = await userService.create({
      ip,
      name,
      email,
      password,
      cpf,
      phone,
      birth,
      descripition,
    });

    return res.status(201).json({
      data: excludeResponseMiddleware(data, ['password']),
    });
  }

  async update(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      phone,
      descripition,
    }: IUserEdit = req.body;

    const { id } = req.user;

    const data = await userService.update({
      id,
      name,
      email,
      password,
      phone,
      descripition,
    });

    return res.status(200).json({
      data: excludeResponseMiddleware(data, ['password']),
    });
  }

  async readAll(req: Request, res: Response) {
    const data = await userService.readAll();

    return res.status(200).json({
      data: excludeResponseMiddleware(data, [
        'password',
        'email',
        'cpf',
        'phone',
        'birth',
        'isAdm',
        'isActive',
        'isVerify',
      ]),
    });
  }

  async delete(req: Request, res: Response) {
    const userId = req.user.id;

    const data = await userService.delete({ userId });

    return res
      .status(200)
      .json({ response: 'User Deleted with Sucess' });
  }

  async addressCreate() {}

  async addressUpdate() {}

  async addressRead() {}

  async addressDelete() {}

  async passwordRecover(req: Request, res: Response) {
    try {
      //Aqui pegamos o assunto, texto e o email do destinatário vindos do body da requisição
      //subject -> assunto
      //text -> texto
      //email -> email do destinatário

      const newṔassword = `${uuid()}`;

      const { id } = req.user;

      const updateUser = await prismaConnect.users.update({
        where: {
          id,
        },
        data: {
          password: newṔassword,
        },
      });

      const { to }: IEmailRequest = req.body;
      const subject = 'Recovery: Here your new password';
      const text = `Your new password: ${newṔassword}`;

      //Chamamos a função que fará o envio do email, passando os dados recebidos
      await userService.sendEmail({ subject, text, to });
      return res.json({
        message: 'Email sended with success!',
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  }
}

export default new userController();
