import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../../utils/error/index';

class announcementBodyMiddleware {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const {
      title,
      saleType,
      descripition,
      year,
      milage,
      price,
    } = req.body;
    console.log(req.body);

    if (!title || !saleType || !year || !milage || !price) {
      throw new BadRequestError('invalid body format');
    }

    if (
      typeof title !== 'string' ||
      typeof saleType !== 'string' ||
      (typeof descripition !== 'string' && descripition) ||
      typeof year !== 'string' ||
      typeof milage !== 'string' ||
      typeof price !== 'string'
    ) {
      throw new BadRequestError('invalid body format');
    }

    if (year.length > 2) {
      throw new BadRequestError(
        'invalid body format, year must be XX'
      );
    }
    next();
  }
}

export default new announcementBodyMiddleware();
