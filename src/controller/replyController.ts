import { Request, Response } from 'express';
import { IReplyCreate, IReplyEdit } from '../interfaces';
import replyService from '../service/replyService';

/*
envio de imagens:
O serviço tem um service próprio, já pronto, 
só guardar numa variável ele responde um array strings das urls´s, 

    Decidir se a rota vai ser junta ou separada.

*/

class replyController {
  async create(req: Request, res: Response) {
    const {
      userId,
      announcementId,
      userName,
      reply,
    }: IReplyCreate = req.body;

    const data = await replyService.create({
      userId,
      announcementId,
      userName,
      reply,
    });

    return res.status(201).json({
      data,
    });
  }

  async update(req: Request, res: Response) {
    const {
      id,
      userId,
      announcementId,
      userName,
      reply,
    }: IReplyEdit = req.body;

    const data = await replyService.update(
      {
        id,
        userId,
        announcementId,
        userName,
        reply,
      },
      req,
      res
    );

    return res.status(200).json({
      data,
    });
  }

  async read(req: Request, res: Response) {
    const data = await replyService.readFrom(
      req.body.announcementId
    );
    return res.status(200).json({ data });
  }

  async delete(req: Request, res: Response) {
    const data = await replyService.delete(req, res);

    return res
      .status(200)
      .json({ response: 'User Deleted with Sucess' });
  }
}

export default new replyController();
