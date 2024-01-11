import { Router } from 'express';
import TeamsRoute from './TeamsRouter';

const router = Router();

router.use('/teams', TeamsRoute);

export default router;
