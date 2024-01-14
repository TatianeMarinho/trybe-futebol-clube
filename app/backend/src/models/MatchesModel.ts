import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/sequelizeMatch';
import { IFindAll } from '../Interfaces/IModels';

export default class MatchesModel implements IFindAll<SequelizeMatch> {
  private _mathchModel = SequelizeMatch;

  public async findAll(): Promise<SequelizeMatch[]> {
    const getList = await this._mathchModel.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return getList;
  }
}
