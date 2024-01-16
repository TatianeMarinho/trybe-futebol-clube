import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardSevice';
import HttpStatus from '../utils/HttpStatus';

export default class LeaderboardController {
  constructor(private _leaderboardService = new LeaderboardService()) {
  }

  async getHomeLeaderboard(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this._leaderboardService.homeLeaderboard();

    return res.status(HttpStatus(status)).json(data);
  }
}
