import { User } from '../schemas/index.js';

const userModel = {
  findAll: async () => {
    const users = await User.find({});

    return users;
  },
  findByEmail: async (email) => {
    const user = await User.findOne({ email });

    return user;
  },
  createUser: async (userInfo) => {
    const user = await User.create(userInfo);

    return user;
  },
  /* updateUser: async (userId, editedInfo) => {
    const updatedUser = await User.updateOne({ _id: userId }, editedInfo);

    return updatedUser;
  },
  deleteUser: async (userId) => {
    const deletedUser = await User.deleteOne({ _id: userId });

    return deletedUser;
  }, */
};

export default userModel;
