import { IModelTeams } from '../Interfaces/IModels';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamsModel implements IModelTeams<SequelizeTeam> {
  private _teamModel = SequelizeTeam;

  public async findAll(): Promise<SequelizeTeam[]> {
    const getList = await this._teamModel.findAll();

    return getList;
  }

  public async findById(id: number): Promise<SequelizeTeam | null> {
    const getTeam = await this._teamModel.findByPk(id);

    return getTeam;
  }
}
