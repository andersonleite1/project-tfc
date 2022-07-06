import { Model, DataTypes } from 'sequelize';
import Matches from './MatchesModel';
import db from '.';

export default class Team extends Model {
  id: number;
  teamName: string;
}
Team.init(
  {
    teamName: DataTypes.STRING,
  },
  {
    sequelize: db,
    underscored: true,
    modelName: 'teams',
    timestamps: false,
  },
);

Matches.belongsTo(Team, { foreignKey: 'home_team', as: 'teamHome' });
Matches.belongsTo(Team, { foreignKey: 'away_team', as: 'teamAway' });

Team.hasMany(Matches, { foreignKey: 'home_team', as: 'teamHome' });
Team.hasMany(Matches, { foreignKey: 'away_team', as: 'teamAway' });
