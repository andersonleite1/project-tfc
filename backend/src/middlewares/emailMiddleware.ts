import { Request, Response, NextFunction } from 'express';

const isEmailValid = (email: string): boolean => {
  const atSign = email.indexOf('@');
  if (atSign < 1) return false;

  const dot = email.indexOf('.');
  if (dot <= atSign + 2) return false;
  if (dot === email.length - 1) return false;

  return true;
};

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    if (!isEmailValid(email)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    next();
  } catch (err) {
    next(err);
  }
};
