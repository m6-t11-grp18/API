import { NextFunction, Request, Response } from 'express';
import {
  IUserCreate,
  IUserEdit,
  IUserAddressEdit,
} from '../../interfaces/index';
import { BadRequestError } from '../../utils/error/index';
import verifyBodyMiddeware from '../verifyBodyMiddeware';

class userBodyMiddleware {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const response = await verifyBodyMiddeware(
      req,
      [
        'name',
        'email',
        'password',
        'cpf',
        'phone',
        'birth',
        'descripition'
      ],
      [
        'string',
        'string',
        'string',
        'string',
        'string',
        'string',
        'string'
      ],
      {
        email: (value: string) => {
          const RegExp =
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
          return RegExp.test(value)
            ? undefined
            : {
                message: 'must be a email',
                expected: true,
              };
        },
        password: (value: string) => {
          const RegExp =
            /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g;
          return RegExp.test(value)
            ? undefined
            : {
                message:
                  'include upper lower case, symbol and number',
                expected: true,
              };
        },
      }
    );

    response === undefined
      ? next()
      : res.status(400).json(response);
  }

  async edit(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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
