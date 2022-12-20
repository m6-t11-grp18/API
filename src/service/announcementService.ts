import { Request, Response } from 'express';
import { IAnnouncementCreate } from '../interfaces';
import { excludeMiddleware } from '../middleware/excludeMiddleware';
import imagesMiddleware from '../middleware/imagesMiddleware';
import prismaConnect from '../utils/dataBaseClient';

class announcementService {
  async create({
    ip,
    userId,
    title,
    saleType,
    descripition,
    year,
    milage,
    price,
    cover,
  }: IAnnouncementCreate) {
    const announcement =
      await prismaConnect.announcement.create({
        data: {
          title,
          UserId: userId,
          saleType,
          descripition,
          year,
          milage,
          price,
          cover: cover[0],
          isActive: true,
          sold: false,
        },
        include: {
          user: true,
          bids: true,
          images: true,
          reply: true,
        },
      });

    await prismaConnect.userSessions.create({
      data: {
        UserId: userId,
        ip,
        type: 'user: create announcement',
      },
    });

    return excludeMiddleware(announcement, [
      'password',
      'cpf',
    ]);
  }

  async update() {}

  async read() {}

  async delete() {}
}

export default new announcementService();
