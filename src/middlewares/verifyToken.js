import jwt from 'jsonwebtoken';
import { customError } from '../middlewares/index.js';

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  try {
    if (!authHeader) {
      throw new customError(401, 'Authorization 헤더가 없습니다.');
    }

    const token = authHeader ? authHeader.replace('Bearer ', '') : null;
    if (!token) {
      throw new customError(401, 'Authorization 헤더에 토큰이 없습니다.');
    }

    const result = jwt.verify(token, process.env.SECRET_KEY);
    if (!result) {
      throw new customError(401, '잘못된 토큰입니다.');
    }

    console.log('🪙  Token has been verified!');

    next();
  } catch (err) {
    next(err);
  }
};

export default verifyToken;
