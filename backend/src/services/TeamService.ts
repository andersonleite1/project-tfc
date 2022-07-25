import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  static async getAll() {
    const teams = await TeamModel.findAll();
    return teams;
  }

  static async getById(id: number) {
    const team = await TeamModel.findByPk(id);
    return team;
  }
}
