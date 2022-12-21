import { Request, Response } from 'express';
import imagesMiddleware from '../middleware/imagesMiddleware';
import announcementService from '../service/announcementService';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { excludeResponseMiddleware } from '../middleware/excludeResponseMiddleware';

/*
envio de imagens:
O serviço tem um service próprio, já pronto, 
só guardar numa variável ele responde um array strings das urls´s, 

    Decidir se a rota vai ser junta ou separada.

*/

class announcementController {
  async create(req: Request, res: Response) {
    const {
      title,
      saleType,
      descripition,
      year,
      milage,
      price,
    } = req.body;

    const ip = req.ip;

    const userId = req.user.id;

    const cover = await imagesMiddleware(
      req,
      res,
      'announcementCover',
      1
    );

    const images = await imagesMiddleware(
      req,
      res,
      'announcementImages',
      Infinity
    );

    let data = await announcementService.create({
      ip,
      userId,
      title,
      saleType,
      descripition,
      year,
      milage,
      price,
      cover,
      images,
    });
    // data = excludeResponseMiddleware(data, [
    //   'password',
    //   'cpf',
    //   'email',
    //   'phone',
    //   'birth',
    // ]);

    return res.status(201).json({ data });
  }

  async update() {}

  async read() {}

  async delete() {}

  async getAllProducts(req: Request, res: Response) {
    const data = await announcementService.getAllProducts();

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
}

export default new announcementController();
