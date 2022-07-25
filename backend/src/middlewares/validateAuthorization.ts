import { Request, Response, NextFunction } from 'express';
import Jwt from '../helpers/Jwt';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token must be a valid token' });
    Jwt.verify(authorization);

    next();
  } catch (err) {
    if (err instanceof Error && err.name.includes('Token')) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next(err);
  }
};
