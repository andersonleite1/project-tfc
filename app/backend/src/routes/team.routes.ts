import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

router
  .get(
    '/:id',
    TeamController.getById,
  )
  .get(
    '/',
    TeamController.getAll,
  );

export default router;
