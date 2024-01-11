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

  public async findByid(id: number): Promise<ServiceResponse<ITeam | null>> {
    const getOnTeam = await this._teamsModel.findById(id);
    if (!getOnTeam) {
      return { status: 'notFound', data: { message: 'team not found' } };
    } return { status: 'ok', data: getOnTeam };
  }
}
