import IMatch from '../interfaces/IMatch';

const teamData = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const resetTeamData = () => {
  teamData.totalPoints = 0;
  teamData.totalGames = 0;
  teamData.totalVictories = 0;
  teamData.totalDraws = 0;
  teamData.totalLosses = 0;
  teamData.goalsFavor = 0;
  teamData.goalsOwn = 0;
  teamData.goalsBalance = 0;
  teamData.efficiency = 0;
};

const addDataVictories = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamData.totalPoints += 3;
  teamData.totalVictories += 1;
  teamData.goalsFavor += homeTeamGoals;
  teamData.goalsOwn += awayTeamGoals;
};

const addDataVictoriesAway = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamData.totalPoints += 3;
  teamData.totalVictories += 1;
  teamData.goalsFavor += awayTeamGoals;
  teamData.goalsOwn += homeTeamGoals;
};

const addDataDraws = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamData.totalPoints += 1;
  teamData.totalDraws += 1;
  teamData.goalsFavor += homeTeamGoals;
  teamData.goalsOwn += awayTeamGoals;
};

const addDataDrawsAway = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamData.totalPoints += 1;
  teamData.totalDraws += 1;
  teamData.goalsFavor += awayTeamGoals;
  teamData.goalsOwn += homeTeamGoals;
};

const addDataLoses = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamData.totalLosses += 1;
  teamData.goalsFavor += homeTeamGoals;
  teamData.goalsOwn += awayTeamGoals;
};

const addDataLosesAway = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamData.totalLosses += 1;
  teamData.goalsFavor += awayTeamGoals;
  teamData.goalsOwn += homeTeamGoals;
};

const calculateEfficiency = (totalPoints: number, totalGames: number) => {
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return Number(efficiency).toFixed(2);
};

const calculateTotalPointsHome = (matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) addDataVictories(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) addDataDraws(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) addDataLoses(homeTeamGoals, awayTeamGoals);
  });
};

const calculateTotalPointsAway = (matches: IMatch[]): void => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }): void => {
    if (homeTeamGoals < awayTeamGoals) addDataVictoriesAway(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) addDataDrawsAway(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals > awayTeamGoals) addDataLosesAway(homeTeamGoals, awayTeamGoals);
  });
};

const calculateStatisticsTeamPlayedHome = (name: string, matches: IMatch[]) => {
  if (name !== teamData.name) resetTeamData();
  teamData.name = name;
  calculateTotalPointsHome(matches);
  teamData.totalGames += 1;
  teamData.goalsBalance = teamData.goalsFavor - teamData.goalsOwn;
  const efficiency = calculateEfficiency(teamData.totalPoints, teamData.totalGames);
  teamData.efficiency = Number(efficiency);

  return teamData;
};

const calculateStatisticsTeamPlayedAway = (name: string, matches: IMatch[]) => {
  if (name !== teamData.name) resetTeamData();
  teamData.name = name;
  calculateTotalPointsAway(matches);
  teamData.totalGames += 1;
  teamData.goalsBalance = teamData.goalsFavor - teamData.goalsOwn;
  const efficiency = calculateEfficiency(teamData.totalPoints, teamData.totalGames);
  teamData.efficiency = Number(efficiency);

  return teamData;
};

export {
  calculateStatisticsTeamPlayedHome,
  calculateStatisticsTeamPlayedAway,
};
