import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await TeamService.getAll();
      return res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const teamId = parseInt(id, 10);
      const team = await TeamService.getById(teamId);
      if (!team) return res.status(404).json({ message: 'Team not found' });
      return res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  }
}
