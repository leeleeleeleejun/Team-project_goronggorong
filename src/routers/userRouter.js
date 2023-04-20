import { Router } from 'express';
import { userService } from '../services/index.js';

const router = Router();

router.post('/signup', userService.createUser);
router.post('/signin', userService.verifyUser);

export { router as userRouter };

/*
 * signup post 회원가입
 * signin post 로그인
 */
