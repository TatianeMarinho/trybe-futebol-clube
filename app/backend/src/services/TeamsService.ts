import TeamsModel from '../models/TeamsModel';
import ITeam from '../Interfaces/team/ITeam';
import { ServiceResponse } from '../types/ServiceResponseType';

export default class TeamsService {
  constructor(private _teamsModel = new TeamsModel()) {
  }

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const getAllTeams = await this._teamsModel.findAll();
    if (!getAllTeams) {
      return { status: 'internalServerError', data: { message: 'unknown error occurred' } };
    } return { status: 'ok', data: getAllTeams };
  }
}
