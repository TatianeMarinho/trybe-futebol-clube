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
}
