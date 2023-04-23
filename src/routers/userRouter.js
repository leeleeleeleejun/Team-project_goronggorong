import { Router } from 'express';
import { userController } from '../controllers/index.js';

const router = Router();

router.post('/signup', userController.createUser);
router.post('/signin', userController.verifyUser);
router.put('/mypage/edit-user-info', userController.myPageUpdate);
router.delete('/mypage/delete-user-info', userController.myPageDelete);

export { router as userRouter };

/*
 * signup post 회원가입
 * signin post 로그인
 */
