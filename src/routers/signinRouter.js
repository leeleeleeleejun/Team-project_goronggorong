import { Router } from 'express';
import { userService } from '../services/index.js';
import { signToken } from '../middlewares/index.js';

const router = Router();

router.get('/signin', async (req, res) => {
  const users = await userService.getAllUsers();

  if (!users) {
    return res.status(400).json({});
  } else {
    return res.status(200).json({
      message: '전체 User 목록을 읽어왔습니다.',
      users,
    });
  }
});

router.post('/signin', async (req, res) => {
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
});

export { router as signinRouter };
