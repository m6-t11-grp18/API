import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export default async function imagesMiddleware(
  req: Request,
  res: Response
) {
  const cloudinaryRespo: any = [];

  const files: any = req.files;

  for (const file of files) {
    const upload = await cloudinary.uploader.upload(
      file!.path,
      {
        folder: 'motorshop',
      },

      (error: any, result: any) => result
    );
    fs.unlink(file!.path, (error) => {
      if (error) {
        console.log(error);
      }
    });
    cloudinaryRespo.push(upload?.url);
  }

  return cloudinaryRespo;
}
