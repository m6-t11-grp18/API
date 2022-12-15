import { NextFunction, Request, Response } from 'express';
import {
  IUserCreate,
  IUserEdit,
  IUserAddressEdit,
} from '../../interfaces';
import { BadRequestError } from '../../utils/error';

class userBodyMiddleware {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const {
      name,
      email,
      password,
      cpf,
      phone,
      birth,
      descripition,
      type,
    }: IUserCreate = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !cpf ||
      !phone ||
      !birth ||
      !descripition ||
      !type
    ) {
      throw new BadRequestError('invalid body format');
    }
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof cpf !== 'string' ||
      typeof phone !== 'string' ||
      typeof birth !== 'string' ||
      typeof descripition !== 'string' ||
      typeof type !== 'string'
    ) {
      throw new BadRequestError('invalid body format');
    }

    next();
  }

  async edit(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const {
      name,
      email,
      password,
      cpf,
      phone,
      birth,
      descripition,
      type,
    }: IUserEdit = req.body;

    if (
      !name &&
      !email &&
      !password &&
      !cpf &&
      !phone &&
      !birth &&
      !descripition &&
      !type
    ) {
      throw new BadRequestError('invalid body format');
    }

    if (
      (typeof name !== 'string' && name) ||
      (typeof email !== 'string' && email) ||
      (typeof password !== 'string' && password) ||
      (typeof cpf !== 'string' && cpf) ||
      (typeof phone !== 'string' && phone) ||
      (typeof birth !== 'string' && birth) ||
      (typeof descripition !== 'string' && descripition) ||
      (typeof type !== 'string' && type)
    ) {
      throw new BadRequestError('invalid body format');
    }

    next();
  }

  async createAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const {
      zipCode,
      state,
      city,
      street,
      number,
      complement,
    } = req.body;

    if (!zipCode || !state || !city || !street || !number) {
      throw new BadRequestError('invalid body format');
    }

    if (
      typeof zipCode !== 'string' ||
      typeof state !== 'string' ||
      typeof city !== 'string' ||
      typeof street !== 'string' ||
      typeof number !== 'string'
    ) {
      throw new BadRequestError('invalid body format');
    }

    next();
  }

  async editAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const {
      addressId,
      zipCode,
      state,
      city,
      street,
      number,
      complement,
    }: IUserAddressEdit = req.body;

    if (
      !addressId ||
      (!zipCode &&
        !state &&
        !city &&
        !street &&
        !number &&
        !complement)
    ) {
      throw new BadRequestError('invalid body format');
    }

    if (
      (typeof addressId !== 'string' && addressId) ||
      (typeof zipCode !== 'string' && zipCode) ||
      (typeof state !== 'string' && state) ||
      (typeof city !== 'string' && city) ||
      (typeof street !== 'string' && street) ||
      (typeof number !== 'string' && number) ||
      (typeof complement !== 'string' && complement)
    ) {
      throw new BadRequestError('invalid body format');
    }

    next();
  }

  async deleteAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { addressId } = req.body;

    if (!addressId) {
      throw new BadRequestError('invalid body format');
    }

    if (typeof addressId !== 'string') {
      throw new BadRequestError('invalid body format');
    }

    next();
  }
}

export default new userBodyMiddleware();
