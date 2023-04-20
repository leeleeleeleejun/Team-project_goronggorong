import { Router } from 'express';
import { userService } from '../services/index.js';
import { signToken } from '../middlewares/index.js';

const router = Router();

/*
 * /signup
 * 회원가입
 */
router.get('/signup', async (req, res) => {
  const users = await userService.getAllUsers();

  if (!users) {
    // 404 Not Found
    return res.status(404).json({
      message: '생성된 사용자가 없습니다.',
    });
  } else {
    return res.status(200).json({
      message: '전체 사용자 목록을 읽어왔습니다.',
      users,
    });
  }
});

router.post('/signup', async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  const user = await userService.createUser({ name, email, password, phone, address });

  // 201 Created
  return res.status(201).json({
    message: '사용자가 생성됐습니다.',
    user,
  });
});

/*
 * /signin
 * 로그인
 */
router.get('/signin', async (req, res) => {
  const users = await userService.getAllUsers();

  if (!users) {
    // 404 Not Found
    return res.status(404).json({
      message: '생성된 사용자가 없습니다.',
    });
  } else {
    // 201 Created
    return res.status(200).json({
      message: '전체 사용자 목록을 읽어왔습니다.',
      users,
    });
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.userModel.findByEmail(email);
  const result = await userService.isValidPassword(password, user.password);

  if (result === false) {
    // 401 Unauthorized
    return res.status(401).json({
      message: '유효하지 않은 사용자입니다.',
    });
  }

  const token = signToken(user);

  return res.status(200).json({
    message: '유효한 사용자 계정입니다.',
    result,
    token,
  });
});

export { router as signUserRouter };
