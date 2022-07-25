import ILeaderboard from '../interfaces/ILeaderboard';

const organizeClassification = (matches: ILeaderboard[]) => matches.sort((teamX, teamY) => (
  teamY.totalPoints - teamX.totalPoints
  || teamY.totalVictories - teamX.totalVictories
  || teamY.goalsBalance - teamX.goalsBalance
  || teamY.goalsFavor - teamX.goalsFavor
  || teamX.goalsOwn - teamY.goalsOwn
));

export default organizeClassification;
