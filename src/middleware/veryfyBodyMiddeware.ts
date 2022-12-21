import { json } from 'body-parser';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../utils/error';

export default function veryfyBodyMiddeware(
  requiredValues: string[],
  requiredType?: string[] | undefined,
  callback?: any
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const requestValues = req.body;

    let MissingsKeys: { [key: string]: string } = {};
    let WrongType: { [key: string]: string } = {};
    let ExpectedValue: { [key: string]: string } = {};

    for (let key of requiredValues) {
      if (!Object.keys(requestValues).includes(key)) {
        MissingsKeys[key] = 'is required';
      }
    }

    for (let [key, value] of Object.entries(
      requestValues
    )) {
      let index = 0;
      if (
        requiredType !== undefined &&
        typeof value !== requiredType[index]
      ) {
        WrongType[
          key
        ] = `expected type is ${requiredType[index]}`;
        index++;
      }
    }

    for (let [key, value] of Object.entries(
      requestValues
    )) {
      let index = 0;
      if (
        callback !== undefined &&
        callback[index] !== undefined &&
        callback[index](value)
      ) {
        ExpectedValue[
          key
        ] = `expected type is ${ExpectedValue[index]}`;
      }
    }

    let errors: any = {};

    if (Object.keys(MissingsKeys).length > 0) {
      errors['Expected Keys'] = MissingsKeys;
    }

    if (Object.keys(WrongType).length > 0) {
      errors['Expected Type'] = WrongType;
    }

    if (Object.keys(ExpectedValue).length > 0) {
      errors['Expected Value'] = ExpectedValue;
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: 'invalid body format',
        errors,
      });
    }
    next();
  };
}
