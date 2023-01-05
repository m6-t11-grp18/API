import { Request, Response } from 'express';
import {
  IUserCreate,
  IUserDelete,
  IUserEdit,
} from '../interfaces/index';
import { excludeResponseMiddleware } from '../middleware/excludeResponseMiddleware';
import userService from '../service/userService';
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
}

export default new userController();
