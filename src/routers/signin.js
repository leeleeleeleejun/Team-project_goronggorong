import { Router } from 'express';
import { userService } from '../services/index.js';
import { asyncHandler } from '../utils/index.js';
import { signToken } from '../middlewares/jwt.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();

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
    const user = await userService.userModel.findByEmail(email);
    const result = await userService.isValidPassword(password, user.password);

    if (result === false) {
      throw new Error('비밀번호가 틀렸습니다.');
    }

    const token = signToken(user);

    return res.status(200).json({
      message: '유효한 User 계정입니다.',
      result,
      token,
    });
  }),
);

export { router as signinRouter };
