import { Request, Response } from 'express';
import HttpStatus from '../utils/HttpStatus';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private _matchesService = new MatchesService()) {
  }

  public async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this._matchesService.findAll();

    return res.status(HttpStatus(status)).json(data);
  }

  public async getFilterProgress(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    const { status, data } = await this._matchesService.findAllProgress(inProgress as string);

    return res.status(HttpStatus(status)).json(data);
  }

  public async patchFinishedProgress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { status, data } = await this._matchesService.updateProgressId(Number(id));
    return res.status(HttpStatus(status)).json(data);
  }
}
