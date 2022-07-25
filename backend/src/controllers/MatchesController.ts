import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;

      if (inProgress === 'false') {
        const matchesFinished = await MatchesService.getFinished();
        return res.status(200).json(matchesFinished);
      }

      if (inProgress === 'true') {
        const matchesInProgress = await MatchesService.getInProgress();
        return res.status(200).json(matchesInProgress);
      }

      const matches = await MatchesService.getAll();

      return res.status(201).json(matches);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

      const newMatch = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };

      const matchCreated = await MatchesService.setInProgress(newMatch);

      if (!matchCreated) return res.status(404).json({ message: 'There is no team with such id!' });

      return res.status(201).json(matchCreated);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { params: { id }, body: { homeTeamGoals, awayTeamGoals } } = req;

      const matchId = parseInt(id, 10);

      await MatchesService.setUpdate(matchId, homeTeamGoals, awayTeamGoals);

      return res.status(200).json({ message: 'Updated' });
    } catch (err) {
      next(err);
    }
  }

  static async finish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const matchId = parseInt(id, 10);

      await MatchesService.setFinished(matchId);

      return res.status(200).json({ message: 'Finished' });
    } catch (err) {
      next(err);
    }
  }
}
