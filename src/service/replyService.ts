import { Request, Response } from 'express';
import {
  IReplyCreate,
  IReplyDelete,
  IReplyEdit,
} from '../interfaces';
import prismaConnect from '../utils/dataBaseClient';
import { NotFoundError } from '../utils/error';

/*
envio de imagens:
O serviço tem um service próprio, já pronto, 
só guardar numa variável ele responde um array strings das urls´s, 

    Decidir se a rota vai ser junta ou separada.

*/

class replyService {
  async create({
    userId,
    announcementId,
    userName,
    reply,
  }: IReplyCreate) {
    const findUser = await prismaConnect.users.findUnique({
      where: { id: userId },
    });

    if (!findUser) {
      throw new NotFoundError('No User Found.');
    }

    const replyData = await prismaConnect.replys.create({
      data: {
        userId,
        userName,
        AnnouncementId: announcementId,
        reply,
      },
    });

    return replyData;
  }

  async update(
    { id, userId, userName, reply }: IReplyEdit,
    req: Request,
    res: Response
  ) {
    const reqUserId = req.user.id;

    if (userId !== reqUserId) {
      return res.status(401).json('Unauthorized request');
    }

    const updatedReply = await prismaConnect.replys.update({
      where: {
        id,
      },
      data: {
        userName,
        reply,
      },
    });

    return { updatedReply };
  }

  async readFrom(announcementId: string) {
    const AllReplys = await prismaConnect.replys.findMany({
      where: { AnnouncementId: announcementId },
    });
    if (!AllReplys) {
      throw new NotFoundError('No User Found.');
    }
    return AllReplys;
  }

  async delete(req: Request, res: Response) {
    const { userId, replyId }: IReplyDelete = req.body;
    const { id } = req.user;
    if (id !== userId) {
      return res.status(401).json('Unauthorized request');
    }

    const deleteReply = await prismaConnect.replys.delete({
      where: {
        id: replyId,
      },
    });

    return { response: 'Reply deleted with success.' };
  }
}

export default new replyService();
