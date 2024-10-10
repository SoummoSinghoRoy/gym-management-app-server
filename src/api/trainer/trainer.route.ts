import { Router} from 'express';
const trainerRouter = Router();

import { isAdmin, isAuthenticated } from '../../middleware/isAuthenticated.middleware';

trainerRouter.post('/add', isAuthenticated, isAdmin);

export default trainerRouter;