import { Router } from 'express';
import { userModel } from '../db/models/index.js';
import { asyncHandler } from '../utils/index.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await userModel.findAll();

    if (!users) {
      return res.status(200).json({
        message: '생성된 User가 없습니다.',
      });
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
    const { name, email, password, phone, address } = req.body;

    const user = await userModel.createUser({ name, email, password, phone, address });

    return res.status(200).json({
      message: 'User가 생성됐습니다.',
      user,
    });
  }),
);

export { router as signupRouter };
