import { messageErrorInterno } from '../tests/mocks/usersMock';
import { ServiceResponse } from '../types/ServiceResponseType';
import { ILeaderboard } from '../Interfaces/leaderboard/IModelLeaderboard';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(private _leaderboardModel = new LeaderboardModel()) {
  }

  public async homeLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const home = await this._leaderboardModel.homeLeaderboard();

    if (!home) {
      return { status: 'internalServerError', data: messageErrorInterno };
    } return { status: 'ok', data: home };
  }
}
