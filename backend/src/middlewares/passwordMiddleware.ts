import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;

    if (!password) return res.status(400).json({ message: 'All fields must be filled' });
    if (password.length < 6) {
      return res.status(422).json(
        { message: '"password" length must be at least 6 characters long' },
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};
