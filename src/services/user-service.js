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

  // bcrypt
  async createHashPassword(password) {
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async isValidPassword(password) {
    const compareResult = bcrypt.compare(password, this.userModel.password);

    return compareResult;
  }
}

const userService = new UserService(userModel);

export default userService;

/* 
  bcrypt
  .hash: hash password 생성
  .compare: hashpassword 비교
*/
