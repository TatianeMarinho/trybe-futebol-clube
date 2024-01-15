import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/sequelizeMatch';
import { IModelMatches } from '../Interfaces/IModels';

export default class MatchesModel implements IModelMatches<SequelizeMatch> {
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

  public async findAllProgress(inProgress: string): Promise<SequelizeMatch[]> {
    const filterProgress = inProgress === 'false' ? { inProgress: false } : { inProgress: true };

    const listFiltered = await this._mathchModel.findAll({
      where: filterProgress,
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return listFiltered;
  }

  public async updateProgressId(id: number): Promise<object> {
    await this._mathchModel.update({ inProgress: false }, { where: { id } });

    return { message: 'Finished' };
  }

  public async updatedMatchesId(id: number, info: object): Promise<boolean | null> {
    const [updated] = await this._mathchModel.update(info, { where: { id } });

    return updated > 0;
  }
}
