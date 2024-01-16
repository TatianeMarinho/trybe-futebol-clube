import { messageErrorInterno } from '../tests/mocks/usersMock';
import { ServiceResponse } from '../types/ServiceResponseType';
import { ILeaderboard } from '../Interfaces/leaderboard/IModelLeaderboard';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(private _leaderboardModel = new LeaderboardModel()) {
  }

  public async homeLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const home = await this._leaderboardModel.homeLeaderboard();
    const orderingHome = LeaderboardService.ordering(home);

    if (!orderingHome) {
      return { status: 'internalServerError', data: messageErrorInterno };
    } return { status: 'ok', data: orderingHome };
  }

  static ordering(array: ILeaderboard[]) {
    array.sort((teamsA, teamsB) => {
      // compara o totalPoints em ordem decrescente
      if (teamsA.totalPoints < teamsB.totalPoints) { return 1; }
      // se o totalPoints for igual
      if (teamsA.totalPoints === teamsB.totalPoints) {
        // compara o goalsBalance para desempatar em ordem decrescente
        if (teamsA.goalsBalance < teamsB.goalsBalance) { return 1; }
        // se os goalsBalance tmbm for igual
        if (teamsA.goalsBalance === teamsB.goalsBalance) {
          // compara o goalsFavor em ordem decrescente
          if (teamsA.goalsFavor < teamsB.goalsFavor) { return 1; }
          // se todos forem iguais, mantem a ordem
          return -1;
        }
        // os goalsBalance forem diferentes, mantem a ordem
        return -1;
      }
      // se os totalPoints sao diferentes, mantem a ordem
      return -1;
    });

    return array;
  }
}
