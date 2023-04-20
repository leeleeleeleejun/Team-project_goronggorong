import jwt from 'jsonwebtoken';
import app from '../app.js';

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

const verifyToken = () => {};

export { signToken, verifyToken };
