import { Router } from 'express';
import UserController from '../controllers/UserController';
import middleware from '../middlewares';

const router = Router();

router
  .get(
    '/validate',
    UserController.loginValidate,
  )
  .post(
    '/',
    middleware.validateEmail,
    middleware.validatePassword,
    UserController.login,
  );

export default router;
