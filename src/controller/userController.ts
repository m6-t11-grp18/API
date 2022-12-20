import { Request, Response } from 'express';
import { IUserCreate } from '../interfaces/index';
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

    return res.status(201).json({ data });
  }

  async update() {}

  async read() {}

  async delete() {}

  async addressCreate() {}

  async addressUpdate() {}

  async addressRead() {}

  async addressDelete() {}
}

export default new userController();
