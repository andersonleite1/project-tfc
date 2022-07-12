import { Router } from 'express';
import middleware from '../middlewares';
import MatchesController from '../controllers/MatchesController';

const router = Router();

router
  .get(
    '/',
    MatchesController.getAll,
  )
  .post(
    '/',
    middleware.validateAuthorization,
    middleware.validateMatch,
    MatchesController.create,
  )
  .patch(
    '/:id/finish',
    MatchesController.finish,
  )
  .patch(
    '/:id',
    MatchesController.update,
  );

export default router;
