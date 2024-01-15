import IMatch from '../Interfaces/match/IMatch';
import { ServiceResponse } from '../types/ServiceResponseType';
import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(private _matchesModel = new MatchesModel()) {
  }

  public async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const getAllMatches = await this._matchesModel.findAll();

    if (!getAllMatches) {
      return { status: 'internalServerError', data: { message: 'Internal Server Error' } };
    } return { status: 'ok', data: getAllMatches };
  }

  public async findAllProgress(inProgress: string) : Promise<ServiceResponse<IMatch[]>> {
    if (inProgress !== undefined) {
      const getFilterProgress = await this._matchesModel.findAllProgress(inProgress);
      return { status: 'ok', data: getFilterProgress };
    }
    const getAll = await this.findAll();
    return getAll;
  }

  public async updateProgressId(id: number): Promise<ServiceResponse<object>> {
    const finishedProgress = await this._matchesModel.updateProgressId(id);

    return { status: 'ok', data: finishedProgress };
  }
}
