import { model } from 'mongoose';
import { UserSchema } from '../schemas/index.js';

const User = model('User', UserSchema);

class UserModel {
  async findAll() {
    const users = await User.find({});

    return users;
  }

  async findById(userId) {
    const user = await User.findById(userId);

    return user;
  }

  async createUser(userInfo) {
    const user = await User.create(userInfo);

    return user;
  }

  async updateUser(userId, editedInfo) {
    const updatedUser = await User.updateOne({ _id: userId }, editedInfo);

    return updatedUser;
  }

  async deleteUser(userId) {
    const deletedUser = await User.deleteOne({ _id: userId });

    return deletedUser;
  }
}

const userModel = new UserModel();

export default userModel;
