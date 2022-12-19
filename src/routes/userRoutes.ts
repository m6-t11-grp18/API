import { Router } from 'express';
import userController from '../controller/userController';
import userBodyMiddleware from '../middleware/body/userBodyMiddleware';

const userRoutes = Router();

userRoutes.post(
  '/',
  userBodyMiddleware.create,
  userController.create
);

userRoutes.get('/');

userRoutes.patch('/');

userRoutes.delete('/');

// address

userRoutes.post('/address');

userRoutes.get('/address');

userRoutes.patch('/address');

userRoutes.delete('/address');

export default userRoutes;
