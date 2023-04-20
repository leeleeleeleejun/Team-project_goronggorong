import bcrypt from 'bcrypt';
import { userModel } from '../db/index.js';

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(userInfo) {
    const hashedPassword = await this.createHashPassword(userInfo.password);
    const user = await this.userModel.createUser({ ...userInfo, password: hashedPassword });

    return user;
  }

  async getAllUsers() {
    const users = await this.userModel.findAll();

    return users;
  }

  /*
   * BCRYPT
   * .hash: hash password 생성
   * .compare: hashpassword 비교
   */
  async createHashPassword(password) {
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async isValidPassword(inputPassword, password) {
    const compareResult = await bcrypt.compare(inputPassword, password);

    return compareResult;
  }
}

const userService = new UserService(userModel);

export default userService;
