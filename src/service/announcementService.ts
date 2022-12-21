import { Request, Response } from 'express';
import { IAnnouncementCreate } from '../interfaces';
import { excludeResponseMiddleware } from '../middleware/excludeResponseMiddleware';
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
    images,
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
          cover:
            cover === undefined ? undefined : cover[0]?.url,
          isActive: true,
          sold: false,
        },
      });

    await prismaConnect.userSessions.create({
      data: {
        UserId: userId,
        ip,
        type: 'user: create announcement',
      },
    });

    if (images !== undefined) {
      for (let elements of images) {
        await prismaConnect.announcementImages.createMany({
          data: {
            AnnouncementId: announcement.id,
            image: elements.url!,
          },
        });
        await prismaConnect.userSessions.create({
          data: {
            UserId: userId,
            ip,
            type: 'user: create announcement image',
          },
        });
      }
    }
    return await prismaConnect.announcement.findUnique({
      where: { id: announcement.id },
      include: {
        user: true,
        bids: true,
        images: true,
        reply: true,
      },
    });
  }

  async update() {}

  async read() {}

  async delete() {}

  async getAllProducts() {
    const data = await prismaConnect.announcement.findMany({
      include: {
        user: true,
        bids: true,
        reply: true,
        images: true,
      },
    });

    return data;
  }
}

export default new announcementService();
