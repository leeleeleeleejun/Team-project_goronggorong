import { Router } from 'express';
import { userModel } from '../db/models/index.js';

const router = Router();

router.get('/', async (req, res, next) => {
  const users = await userModel.findAll();

  if (!users) {
    res.send('signup');
    return;
  } else {
    return res.json({
      code: 200,
      message: '전체 User 목록을 읽어왔습니다.',
      users,
    });
  }
});

router.post('/', async (req, res, next) => {
  const { name, email, password, phone, address } = req.body;

  try {
    const user = await userModel.createUser({ name, email, password, phone, address });

    return res.json({
      code: 200,
      message: 'User가 생성됐습니다.',
      user,
    });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, phone, address } = req.body;

  try {
    const updatedUser = await userModel.updateUser(id, req.body);

    return res.json({
      code: 200,
      message: '사용자 정보가 수정됐습니다.',
      updatedUser,
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await userModel.deleteUser(id);

    return res.json({
      code: 200,
      message: '사용자가 삭제됐습니다',
      deletedUser,
    });
  } catch (err) {
    next(err);
  }
});

export { router as signupRouter };
