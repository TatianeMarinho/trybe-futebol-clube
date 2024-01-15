import { Request, Response, Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware';
import MatchesController from '../controllers/MatchesController';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req: Request, res: Response) => matchesController.getFilterProgress(req, res));

router.patch(
  '/:id/finish',
  validateTokenMiddleware,
  (req: Request, res: Response) => matchesController.patchFinishedProgress(req, res),
);

export default router;
