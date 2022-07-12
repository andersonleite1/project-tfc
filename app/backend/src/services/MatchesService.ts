import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamModel';
import ISaveMatch from '../interfaces/ISaveMatch';

export default class MatchesService {
  static async getAll() {
    const matches = await MatchesModel.findAll({
      include: [
        { model: TeamModel,
          as: 'teamHome',
          attributes: {
            exclude: ['id'],
          },
        },
        { model: TeamModel,
          as: 'teamAway',
          attributes: {
            exclude: ['id'],
          },
        },
      ],
    });
    return matches;
  }

  static async getInProgress() {
    const matches = await this.getAll();
    const matchesInProgress = matches.filter((match) => match.inProgress === true);
    return matchesInProgress;
  }

  static async getFinished() {
    const matches = await this.getAll();
    const matchesInProgress = matches.filter((match) => match.inProgress === false);
    return matchesInProgress;
  }

  static async setInProgress({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: ISaveMatch) {
    const matches = await this.getAll();

    const awayTeamExist = matches.find((match) => match.id === awayTeam);
    const homeTeamExist = matches.find((match) => match.id === homeTeam);

    if (!awayTeamExist || !homeTeamExist) return undefined;

    const matchCreated = await MatchesModel.create(
      { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true },
    );

    return matchCreated;
  }

  static async setUpdate(id: number, homeTeamGoals:number, awayTeamGoals:number) {
    await MatchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  static async setFinished(id: number) {
    await MatchesModel.update({ inProgress: false }, { where: { id } });
  }
}
