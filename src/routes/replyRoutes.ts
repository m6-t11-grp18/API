import { Router } from 'express';
import tokenMiddleware from '../middleware/tokenMiddleware';

const replyRoutes = Router();

replyRoutes.post('/', tokenMiddleware.user);

replyRoutes.get('/', tokenMiddleware.user);

replyRoutes.patch('/', tokenMiddleware.user);

replyRoutes.delete('/', tokenMiddleware.user);

export default replyRoutes;
