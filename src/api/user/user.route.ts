import { Router} from 'express';
const userRouter = Router();
import { userLoginPostController, userSignupPostController } from './user.controller';

userRouter.post('/signup', userSignupPostController);
userRouter.post('/login', userLoginPostController);

export default userRouter;