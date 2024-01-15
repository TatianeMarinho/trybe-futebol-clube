import { Request, Response } from 'express';
import HttpStatus from '../utils/HttpStatus';
import MatchesService from '../services/MatchesService';
import { messageErrorInterno } from '../tests/mocks/usersMock';

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

  public async patchUpdatedMatchesId(req:Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const info = req.body;

    if (!('inProgress' in info)) {
      info.inProgress = true;
    }

    const { status, data } = await this._matchesService.updatedMatchesId(Number(id), info);
    return res.status(HttpStatus(status)).json(data);
  }

  public async createMatch(req:Request, res: Response): Promise<Response> {
    const matchReq = req.body;

    if (!matchReq) {
      return res.status(500).json(messageErrorInterno);
    }
    const { status, data } = await this._matchesService.createMatches(matchReq);
    return res.status(HttpStatus(status)).json(data);
  }
}
