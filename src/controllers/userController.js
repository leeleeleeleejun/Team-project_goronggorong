import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../db/index.js';
import { customError } from '../middlewares/index.js';

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

const userController = {
  createUser: async (req, res, next) => {
    const { name, email, password, phone, address } = req.body;

    try {
      // 중복 email 확인
      const checkUser = await userModel.findByEmail(email);

      if (checkUser) {
        throw new customError(400, '사용자가 이미 있습니다');
      }

      // 사용자 생성
      const salt = 12;
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await userModel.createUser({ name, email, password: hashedPassword, phone, address });

      if (!user) {
        throw new customError(400, '사용자를 생성하는데 실패했습니다.');
      }

      // 201 Created
      return res.status(201).json({
        message: '사용자가 생성됐습니다.',
        user,
      });
    } catch (err) {
      next(err);
    }
  },
  verifyUser: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // 사용자가 있는지 확인
      const user = await userModel.findByEmail(email);

      if (!user) {
        throw new customError(400, '사용자가 없습니다');
      }

      // 비밀번호 확인
      const result = await bcrypt.compare(password, user.password);

      if (result === false) {
        throw new customError(400, '비밀번호가 틀렸습니다');
      }

      // 토큰 생성
      const token = signToken(user);

      return res.status(200).json({
        message: '로그인 성공',
        result,
        token,
      });
    } catch (err) {
      next(err);
    }
  },

  myPageUpdate: async (req, res, next) => {
    const { name, email, Newemail, password, Newpassword, Newphone, Newaddress } = req.body;

    try {
      // 사용자가 있는지 확인
      const user = await userModel.findByEmail(email);

      if (!user) {
        throw new customError(400, '사용자가 없습니다');
      }

      // 비밀번호 확인
      const result = await bcrypt.compare(password, user.password);

      if (result === false) {
        throw new customError(400, '비밀번호가 틀렸습니다');
      }

      const editedInfo = { name: name };

      // 이메일 변경
      if (Newemail) {
        // 중복 email 확인
        const checkUser = await userModel.findByEmail(Newemail);

        if (checkUser) {
          throw new customError(400, '이미 존재하는 이메일입니다.');
        }

        editedInfo.email = Newemail;
      }

      // 패스워드 변경
      if (Newpassword) {
        const salt = 12;
        const hashedPassword = await bcrypt.hash(Newpassword, salt);
        editedInfo.password = hashedPassword;
      }

      // 전화번호 변경
      if (Newphone) {
        editedInfo.phone = Newphone;
      }

      // 주소 변경
      if (Newaddress) {
        editedInfo.address = Newaddress;
      }

      // 사용자 정보 업데이트
      const updatedUser = await userModel.updateUser(user._id, editedInfo);

      return res.status(200).json({
        message: '사용자 정보 업데이트를 성공했습니다',
        user: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  },

  myPageDelete: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // 사용자가 있는지 확인
      const user = await userModel.findByEmail(email);

      if (!user) {
        throw new customError(400, '사용자가 없습니다');
      }

      // 비밀번호 확인
      const result = await bcrypt.compare(password, user.password);

      if (result === false) {
        throw new customError(400, '비밀번호가 틀렸습니다');
      }

      const deletedUser = await userModel.deleteUser({ _id: user._id });

      if (!deletedUser) {
        throw new customError(400, '사용자 삭제에 실패했습니다.');
      }

      return res.status(200).json({
        message: '사용자 삭제 성공',
        deletedUser,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default userController;
