import { Request, Response } from 'express';
import authService from '../service/authService';

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const ip = req.ip;

    const token = await authService.login(
      email,
      password,
      ip
    );

    return res.json({ accessToken: token });
  }

  async adm(req: Request, res: Response) {
    const { email, password } = req.body;
    const ip = req.ip;

    const token = await authService.adm(
      email,
      password,
      ip
    );

    return res.json({ accessToken: token });
  }
}

export default new AuthController();
