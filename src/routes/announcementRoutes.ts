import { Router } from 'express';
import announcementController from '../controller/announcementController';
import authController from '../controller/authController';
import announcementBodyMiddleware from '../middleware/body/announcementBodyMiddleware';
import tokenMiddleware from '../middleware/tokenMiddleware';
import { uploader } from '../utils/imageServer/multerUtils';

const announcementRoutes = Router();

announcementRoutes.post(
  '/',
  tokenMiddleware.user,
  uploader.fields([
    { name: 'announcementCover', maxCount: Infinity },
    { name: 'announcementImages', maxCount: Infinity },
  ]),
  announcementController.create
);

announcementRoutes.get(
  '/products',
  announcementController.getAllProducts
);

// announcementRoutes.patch('/');

// announcementRoutes.delete('/');

export default announcementRoutes;
