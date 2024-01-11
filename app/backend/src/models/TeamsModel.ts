import IFindAll from '../Interfaces/IModels';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamsModel implements IFindAll<SequelizeTeam> {
  private _teamModel = SequelizeTeam;

  public async findAll(): Promise<SequelizeTeam[]> {
    const getList = await this._teamModel.findAll();

    return getList;
  }
}
