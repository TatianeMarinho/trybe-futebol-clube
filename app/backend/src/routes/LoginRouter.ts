import { Request, Response, Router } from 'express';
import UsersController from '../controllers/UsersController';
import validateLoginMiddleware from '../middlewares/validateLoginMiddleware';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware';

const router = Router();

const usersController = new UsersController();

router.post(
  '/',
  validateLoginMiddleware,
  (req: Request, res: Response) => usersController.userLogin(req, res),
);

router.get(
  '/role',
  validateTokenMiddleware,
  (req: Request, res: Response) => usersController.getUserRole(req, res),
);

export default router;
