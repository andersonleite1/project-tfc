import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';

class UserController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await UserService.login({ email, password });

      if (!token) return res.status(401).json({ message: 'Incorrect email or password' });

      res.status(200).json(token);
    } catch (err) {
      next(err);
    }
  }

  static async loginValidate(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (authorization === undefined) return res.status(401).json({ message: 'Invalid token' });

      const userRole = await UserService.loginValidate(authorization);

      if (!userRole) return res.status(401).json({ message: 'Invalid token' });

      return res.status(200).json(userRole);
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
