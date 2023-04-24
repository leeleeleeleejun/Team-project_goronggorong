import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  // if (!authHeader) {
  //   throw new customError(400, '유효하지 않은 토큰입니다.');
  // }
  const token = authHeader ? authHeader.replace('Bearer ', '') : null;
  console.log(token);
  // if (!token) {
  // }

  const result = jwt.verify(token, process.env.SECRET_KEY);

  console.log(result);

  next();
};

export default verifyToken;
