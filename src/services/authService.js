import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const authService = {
  signToken: (user) => {
    const newToken = jwt.sign(
      {
        _id: user.id,
        email: user.email,
        password: user.password,
      },
      process.env.SECRET_KEY,
      {
        issuer: process.env.ISSUER,
      },
    );

    return newToken;
  },
  createHashPassword: async (password) => {
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  },
  verifyPassword: async (password, original) => {
    const result = await bcrypt.compare(password, original);

    if (result === false) {
      throw new customError(400, '비밀번호가 틀렸습니다');
    }

    return result;
  },
  createRandomPassword: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
  },
};

export default authService;

/*
 * BCRYPT
 * .hash: hash password 생성
 * .compare: hashpassword 비교
 */
