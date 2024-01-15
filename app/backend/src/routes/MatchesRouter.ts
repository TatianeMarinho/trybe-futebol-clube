import { Request, Response, Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware';
import MatchesController from '../controllers/MatchesController';
import validateTeamsMatchesMiddleware from '../middlewares/validateTeamsMiddleware';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req: Request, res: Response) => matchesController.getFilterProgress(req, res));

router.patch(
  '/:id/finish',
  validateTokenMiddleware,
  (req: Request, res: Response) => matchesController.patchFinishedProgress(req, res),
);

router.patch(
  '/:id',
  validateTokenMiddleware,
  (req: Request, res: Response) => matchesController.patchUpdatedMatchesId(req, res),
);

router.post(
  '/',
  validateTokenMiddleware,
  validateTeamsMatchesMiddleware,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
