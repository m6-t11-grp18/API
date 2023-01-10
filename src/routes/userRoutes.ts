import { Router } from 'express';
import userController from '../controller/userController';
import userBodyMiddleware from '../middleware/body/userBodyMiddleware';
import tokenMiddleware from '../middleware/tokenMiddleware';
import verifyBodyMiddeware from '../middleware/verifyBodyMiddeware';

const userRoutes = Router();

userRoutes.post(
  '/',
  userBodyMiddleware.create,
  userController.create
);

userRoutes.get('/all/', userController.readAll);

userRoutes.patch(
  '/',
  tokenMiddleware.user,
  userController.update
);

userRoutes.delete(
  '/',
  tokenMiddleware.user,
  userController.delete
);

userRoutes.post(
  '/email/',
  tokenMiddleware.user,
  userController.passwordRecover
);

// addresss

userRoutes.post('/address');

userRoutes.get('/address');

userRoutes.patch('/address');

userRoutes.delete('/address');

export default userRoutes;
