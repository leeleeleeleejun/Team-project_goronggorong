import { customError } from '../middlewares/index.js';
import { authService } from '../services/index.js';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDU0NTRhOTQwZjMxMDM2YjcwNTg4OCIsImVtYWlsIjoidG9tQHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkUHJWeFFhYmFkN0JMTVVBUmNvVVJEdWR1cTRhdndIUkJEdzR0YjNNRmNXcmhTblU3clVVaXUiLCJpYXQiOjE2ODIzMzMxMDQsImlzcyI6Imdvcm9uZ2dvcm9uZyJ9.jc0oGuAJBUsJTzwn5zKc7kBN1RYVoOUgIaTricMOToU
const authController = {
  isLoginUser: async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (authHeader) {
      throw new customError(400, '유효하지 않은 토큰입니다.');
    }
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;

    const result = authService.verifyToken(token);

    return res.status(200).json({
      message: '토큰이 확인됐습니다',
      info: decoded,
    });
  },
};

export default authController;
