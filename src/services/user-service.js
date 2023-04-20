import bcrypt from 'bcrypt';
import { userModel } from '../db/index.js';

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(userInfo) {
    const { name, email, password, phone, address } = userInfo;
    const hashedPassword = await userService.createHashPassword(password);
    const user = await this.userModel.createUser({ name, email, password: hashedPassword, phone, address });

    return user;
  }

  async getUser() {
    const users = await this.userModel.findAll();

    return users;
  }

  /* 
    bcrypt
    .hash: hash password 생성
    .compare: hashpassword 비교
  */
  async createHashPassword(password) {
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async isValidPassword(email, password) {
    const user = await this.userModel.findByPath({ email });

    if (!user) {
      throw new Error('사용자가 없습니다');
    }

    const compareResult = await bcrypt.compare(password, user.password);

    if (compareResult === false) {
      throw new Error('비밀번호가 틀렸습니다.');
    }

    return compareResult;
  }
}

const userService = new UserService(userModel);

export default userService;
