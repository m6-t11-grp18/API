import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import 'dotenv/config';
import { v4 as uuid } from 'uuid';
import { NextFunction, Request, Response } from 'express';

const CLOUDINARY_URL = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export const uploader = multer({
  storage: multer.diskStorage({
    destination: 'upload/motorshop/',
    filename: (request: any, file: any, callback: any) => {
      const filename = `${uuid()}`;

      return callback(null, filename);
    },
  }),
});
