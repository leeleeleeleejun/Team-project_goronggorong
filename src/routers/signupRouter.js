import { Router } from 'express';
import { userService } from '../services/index.js';

const router = Router();

router.get('/signup', async (req, res) => {
  const users = await userService.getAllUsers();

  if (!users) {
    throw new Error('생성된 사용자가 없습니다.');
  } else {
    return res.status(200).json({
      message: '전체 User 목록을 읽어왔습니다.',
      users,
    });
  }
});

router.post('/signup', async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  const user = await userService.createUser({ name, email, password, phone, address });

  return res.status(200).json({
    message: 'User가 생성됐습니다.',
    user,
  });
});

export { router as signupRouter };
