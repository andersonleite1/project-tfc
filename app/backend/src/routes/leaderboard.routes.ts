import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

router
  .get(
    '/home',
    LeaderboardController.home,
  )
  .get(
    '/away',
    LeaderboardController.away,
  );

export default router;
