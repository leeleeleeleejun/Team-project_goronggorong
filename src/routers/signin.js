import { Router } from 'express';
import { userService } from '../services/index.js';
import { asyncHandler } from '../utils/index.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await userService.getUser();

    if (!users) {
      throw new Error('생성된 사용자가 없습니다.');
    } else {
      return res.status(200).json({
        message: '전체 User 목록을 읽어왔습니다.',
        users,
      });
    }
  }),
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.isValidPassword(email, password);

    return res.status(200).json({
      message: '유효한 User 계정입니다.',
      result,
    });
  }),
);

export { router as signinRouter };
