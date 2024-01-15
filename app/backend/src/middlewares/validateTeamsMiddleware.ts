import { NextFunction, Request, Response } from 'express';
import SequelizeTeam from '../database/models/SequelizeTeam';

async function validateTeamsMatchesMiddleware(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const homeTeam = await SequelizeTeam.findByPk(homeTeamId);
  const awayTeam = await SequelizeTeam.findByPk(awayTeamId);

  if (!homeTeam || !awayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
}

export default validateTeamsMatchesMiddleware;
