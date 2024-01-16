import { Router } from 'express';
import TeamsRouter from './TeamsRouter';
import LoginRouter from './LoginRouter';
import MatchesRouter from './MatchesRouter';
import LeaderboardRouter from './LeaderboardRouter';

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/login', LoginRouter);
router.use('/matches', MatchesRouter);
router.use('/leaderboard', LeaderboardRouter);

export default router;
