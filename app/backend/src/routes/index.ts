import { Router } from 'express';
import TeamsRouter from './TeamsRouter';
import LoginRouter from './LoginRouter';
import MatchesRouter from './MatchesRouter';

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/login', LoginRouter);
router.use('/matches', MatchesRouter);

export default router;
