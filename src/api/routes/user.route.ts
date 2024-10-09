import { Router} from 'express';
const router = Router();
import { userLoginPostController, userSignupPostController } from '../controller/user.controller';

router.post('/signup', userSignupPostController);
router.post('/login', userLoginPostController);

export default router;