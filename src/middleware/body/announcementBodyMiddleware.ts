import { NextFunction, Request, Response } from 'express';
import {
  IUserCreate,
  IUserEdit,
  IUserAddressEdit,
} from '../../interfaces';
import { BadRequestError } from '../../utils/error';

class announcementBodyMiddleware {
  async create() {}
}

export default new announcementBodyMiddleware();
