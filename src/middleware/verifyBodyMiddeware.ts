import { json } from 'body-parser';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../utils/error';
import errorMiddleware from './errorMiddleware';

export default async function verifyBodyMiddeware(
  req: Request,
  requiredValues: string[],
  requiredType?: string[] | undefined,
  callback?: any
) {
  const requestValues = req.body;

  let MissingsKeys: { [key: string]: string } = {};
  let WrongType: { [key: string]: string } = {};
  let ExpectedValue: { [key: string]: string } = {};

  for (let key of requiredValues) {
    if (!Object.keys(requestValues).includes(key)) {
      MissingsKeys[key] = `${key} is required`;
    }
  }

  let index = 0;
  for (let [key, value] of Object.entries(requestValues)) {
    if (
      requiredType !== undefined &&
      typeof value !== requiredType[index]
    ) {
      WrongType[
        key
      ] = `expected type is ${requiredType[index]}`;
    }
    index++;
  }

  for (let [key, value] of Object.entries(requestValues)) {
    if (
      callback !== undefined &&
      callback[key] !== undefined &&
      callback[key](value)?.expected
    ) {
      ExpectedValue[key] = `${
        callback[key](value).message === undefined
          ? 'wrong expected format'
          : callback[key](value).message
      }`;
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

  return Object.keys(errors).length > 0
    ? errors
    : undefined;
}
