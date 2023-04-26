import { customError } from '../middlewares/index.js';
import { authService } from '../services/index.js';

const authController = {
  /* refreshToken: async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (authHeader) {
      throw new customError(400, '유효하지 않은 토큰입니다.');
    }
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;
    if (!token) {
      throw new customError(400, '토큰이 없습니다.');
    }

    const decoded = authService.signToken(token);

    return res.status(200).json({
      message: '토큰이 확인됐습니다',
      info: decoded,
    });
  }, */
  getUserInfo: (req, res, next) => {
    const authHeader = req.header('Authorization');

    try {
      if (!authHeader) {
        throw new customError(400, '유효하지 않은 토큰입니다.');
      }

      const decodedInfo = authService.decodeToken(authHeader);

      return res.status(200).json({
        message: '토큰이 확인됐습니다',
        info: decodedInfo,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default authController;
