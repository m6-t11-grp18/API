import { Router } from 'express';
import authController from '../controller/authController';
import authBodyMiddleware from '../middleware/body/authBodyMiddleware';

const authRotes = Router();

// user
authRotes.post(
  '/',
  authBodyMiddleware.login,
  authController.login
);

// adm
authRotes.post(
  '/adm',
  authBodyMiddleware.login,
  authController.adm
);

export default authRotes;
