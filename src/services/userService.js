import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../db/index.js';

/*
 * BCRYPT
 * .hash: hash password 생성
 * .compare: hashpassword 비교
 */
const signToken = (user) => {
  const newToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      password: user.password,
    },
    process.env.SECRET_KEY,
    {
      issuer: 'goronggorong',
    },
  );

  return newToken;
};

const userService = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.findAll();

      if (!users) {
        // 404 Not Found
        throw new Error();
      } else {
        return res.status(200).json({
          message: '전체 사용자 목록을 읽어왔습니다.',
          users,
        });
      }
    } catch (err) {
      return res.status(404).json({
        message: '생성된 사용자가 없습니다',
      });
    }
  },
  createUser: async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    try {
      const salt = 12;
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await UserModel.createUser({ name, email, password: hashedPassword, phone, address });

      // 201 Created
      return res.status(201).json({
        message: '사용자가 생성됐습니다.',
        user,
      });
    } catch (err) {
      return res.status(400).json({
        message: '사용자를 생성하는데 실패했습니다.',
        err,
      });
    }
  },
  verifyUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findByEmail(email);
      const result = await bcrypt.compare(password, user.password);

      if (result === false) {
        throw new error();
      }

      const token = signToken(user);

      return res.status(200).json({
        message: '로그인 성공',
        result,
        token,
      });
    } catch (err) {
      return res.status(400).json({
        message: '로그인 실패',
      });
    }
  },
};

export default userService;
