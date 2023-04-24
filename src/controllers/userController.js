import bcrypt from 'bcrypt';
import { userService, authService } from '../services/index.js';
import { customError } from '../middlewares/index.js';

const userController = {
  createUser: async (req, res, next) => {
    const { name, email, password, phone, address } = req.body;

    try {
      if (!name || !email || !password || !phone || !address) {
        throw new customError(400, '누락된 데이터가 있습니다.');
      }

      await userService.checkUserExist(email, false); // 사용자가 없어야만 함
      const user = await userService.checkAndCreateUser({ name, email, password, phone, address });

      // 201 Created
      return res.status(201).json({
        message: '사용자가 생성됐습니다.',
        info: user,
      });
    } catch (err) {
      next(err);
    }
  },
  verifyUser: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        throw new customError(400, '누락된 데이터가 있습니다.');
      }

      const user = await userService.checkUserExist(email, true); // 사용자가 있어야 함
      const result = await authService.verifyPassword(password, user.password);
      const token = authService.signToken(user);

      return res.status(200).json({
        message: '로그인 성공',
        info: result,
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
