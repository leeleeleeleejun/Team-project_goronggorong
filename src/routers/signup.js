import { Router } from 'express';
import { asyncHandler } from '../utils/index.js';
import { userService } from '../services/index.js';

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
    const user = await userService.createUser(req.body);

    return res.status(200).json({
      message: 'User가 생성됐습니다.',
      user,
    });
  }),
);

export { router as signupRouter };
