import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { BadRequestError } from '../utils/error';
import multer from 'multer';

export default async function imagesMiddleware(
  req: Request,
  res: Response,
  folder: string,
  limit?: number
) {
  const cloudinaryRespo: any = [];

  const files: any = req.files;
  console.log(files);

  if (limit !== undefined && files[folder].length > limit) {
    throw new BadRequestError(
      `${folder} max images is ${limit}`
    );
  }

  for (const file of files[folder]) {
    const upload = await cloudinary.uploader.upload(
      file!.path,

      {
        folder: `motorshop/${folder}`,
      },

      (error: any, result: any) => result
    );
    fs.unlink(file!.path, (error) => {
      if (error) {
        console.log(error);
      }
    });

    cloudinaryRespo.push(upload);
  }

  return cloudinaryRespo;
}
