import { Request, Response } from 'express';
import imagesMiddleware from '../middleware/imagesMiddleware';
import announcementService from '../service/announcementService';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

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

    const cover = await imagesMiddleware(req, res);

    const data = await announcementService.create({
      ip,
      userId,
      title,
      saleType,
      descripition,
      year,
      milage,
      price,
      cover,
    });

    return res.status(201).json({ data });
  }

  async update() {}

  async read() {}

  async delete() {}
}

export default new announcementController();
