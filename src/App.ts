import 'express-async-errors';
import express from 'express';

import cors from 'cors';
import errorMiddleware from './middleware/errorMiddleware';
import userRoutes from './routes/userRoutes';
import announcementRoutes from './routes/announcementRoutes';
import bidRoutes from './routes/bidRoutes';
import replyRoutes from './routes/replyRoutes';
import authRotes from './routes/authRoutes';

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
  maxFieldsSize: 20 * 1024 * 1024,
});
class App {
  server: any;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  async enableCors() {
    const options: cors.CorsOptions = {
      methods: 'GET,POST,PATCH,DELETE',
      origin: '*',
    };

    this.server.use(cors(options));
  }

  async middlewares() {
    this.enableCors();
    this.server.use(express.json());
  }

  async routes() {
    // this.server.use('/');
    this.server.use('/auth', authRotes);
    this.server.use('/user', userRoutes);
    this.server.use('/announcement', announcementRoutes);
    this.server.use('/reply', replyRoutes);
    // this.server.use('/bid', bidRoutes);
    this.server.use(errorMiddleware);
  }
}

export default new App().server;
