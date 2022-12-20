import { Router } from 'express';
import announcementController from '../controller/announcementController';
import authController from '../controller/authController';
import announcementBodyMiddleware from '../middleware/body/announcementBodyMiddleware';
import tokenMiddleware from '../middleware/tokenMiddleware';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { upload } from '../utils/imageServer/cloudinaryUtils';

const announcementRoutes = Router();

announcementRoutes.patch(
  '/',
  tokenMiddleware.user,
  upload.array("image", Infinity),
  announcementController.create
);

// announcementRoutes.get('/');

// announcementRoutes.patch('/');

// announcementRoutes.delete('/');

export default announcementRoutes;
