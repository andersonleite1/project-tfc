import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async home(_req: Request, res: Response, next: NextFunction) {
    try {
      const statisticsTeamsPlayedHome = await LeaderboardService.getHome();
      return res.status(200).json(statisticsTeamsPlayedHome);
    } catch (err) {
      next(err);
    }
  }
}
