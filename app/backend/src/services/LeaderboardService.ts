import ITeam from '../interfaces/ITeam';
import Team from '../database/models/TeamModel';
import Matches from '../database/models/MatchesModel';
import {
  calculateStatisticsTeamPlayedHome,
  calculateStatisticsTeamPlayedAway,
} from '../utils/leaderboards';

import organizeClassification from '../utils/organizeClassification';

export default class LeaderboardService {
  static async getHome() {
    const teamsAll = await Team.findAll() as unknown as ITeam[];

    const statisticsTeamsPlayedHome = await teamsAll.map(async (team) => {
      const teamsMatchesHome = await Matches.findAll(
        { where: { homeTeam: team.id, inProgress: false } },
      );

      const teamsMatchesHomeStatistics = await teamsMatchesHome.map((match) => (
        calculateStatisticsTeamPlayedHome(team.teamName, [match])));

      const teamsStatistics = teamsMatchesHomeStatistics[teamsMatchesHomeStatistics.length - 1];

      return { ...teamsStatistics };
    });

    const teamsData = await Promise.all(statisticsTeamsPlayedHome);
    return organizeClassification(teamsData);
  }

  static async getAway() {
    const teamsAll = await Team.findAll() as unknown as ITeam[];

    const statisticsTeamsPlayedAway = await teamsAll.map(async (team) => {
      const teamsMatchesAway = await Matches.findAll(
        { where: { awayTeam: team.id, inProgress: false } },
      );

      const teamsMatchesAwayStatistics = await teamsMatchesAway.map((match) => (
        calculateStatisticsTeamPlayedAway(team.teamName, [match])));

      const teamsStatistics = teamsMatchesAwayStatistics[teamsMatchesAwayStatistics.length - 1];
      return { ...teamsStatistics };
    });

    const teamsData = await Promise.all(statisticsTeamsPlayedAway);
    return organizeClassification(teamsData);
  }
}
