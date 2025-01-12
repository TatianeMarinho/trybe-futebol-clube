import { messageErrorInterno } from '../tests/mocks/usersMock';
import IMatch from '../Interfaces/match/IMatch';
import { ServiceResponse } from '../types/ServiceResponseType';
import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(private _matchesModel = new MatchesModel()) {
  }

  public async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const getAllMatches = await this._matchesModel.findAll();

    if (!getAllMatches) {
      return { status: 'internalServerError', data: messageErrorInterno };
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

  public async updatedMatchesId(id: number, info: object)
    : Promise<ServiceResponse<{ message: string }>> {
    const updated = await this._matchesModel.updatedMatchesId(id, info);

    if (updated) {
      return { status: 'ok', data: { message: 'Match updated successfully' } };
    } return { status: 'internalServerError', data: messageErrorInterno };
  }

  public async createMatches(matchInfo: IMatch): Promise<ServiceResponse<IMatch>> {
    const newMatch = await this._matchesModel.createMatches(matchInfo);

    if (newMatch) {
      return { status: 'created', data: newMatch };
    } return { status: 'internalServerError', data: messageErrorInterno };
  }
}
