import { Router } from 'express';
import userController from '../controller/userController';
import userBodyMiddleware from '../middleware/body/userBodyMiddleware';
import veryfyBodyMiddeware from '../middleware/veryfyBodyMiddeware';

const userRoutes = Router();

userRoutes.post(
  '/',
  veryfyBodyMiddeware(
    [
      'name',
      'email',
      'password',
      'cpf',
      'phone',
      'birth',
      'descripition',
    ],
    [
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
    ]
  ),
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
