import { Request, Response, Router } from 'express';
import UsersController from '../controllers/UsersController';
import validateLoginMiddleware from '../middlewares/validateLoginMiddleware';

const router = Router();

const usersController = new UsersController();

router.post(
  '/',
  validateLoginMiddleware,
  (req: Request, res: Response) => usersController.userLogin(req, res),
);

export default router;
