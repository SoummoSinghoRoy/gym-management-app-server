import { Router} from 'express';
const userRouter = Router();
import { userLoginPostController, userLogoutPostController, userSignupPostController } from './user.controller';
import { isAuthenticated } from '../../middleware/isAuthenticated.middleware';

userRouter.post('/signup', userSignupPostController);
userRouter.post('/login', userLoginPostController);
userRouter.post('/logout', isAuthenticated, userLogoutPostController);

export default userRouter;