import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import HttpStatus from '../utils/HttpStatus';

export default class TeamsController {
  constructor(private _teamsService = new TeamsService()) {
  }

  public async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this._teamsService.findAll();

    return res.status(HttpStatus(status)).json(data);
  }

  public async getOnTeam(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { status, data } = await this._teamsService.findByid(Number(id));

    return res.status(HttpStatus(status)).json(data);
  }
}
