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

  async getUsers() {
    const users = await this.userModel.findAll();

    return users;
  }

  async getUser({ path }) {
    const user = await this.userModel.findOne({ path });

    return user;
  }

  /* 
    BCRYPT
    .hash: hash password 생성
    .compare: hashpassword 비교
  */
  async createHashPassword(password) {
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async isValidPassword(email, password) {
    const user = await this.userModel.findByEmail(email);
    const result = await bcrypt.compare(password, user.password);

    return result;
  }
}

const userService = new UserService(userModel);

export default userService;
