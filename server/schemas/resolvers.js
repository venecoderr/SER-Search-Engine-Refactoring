const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    async getUser(_, { id, username }) {
      return await User.findOne({
        $or: [{ _id: id }, { username: username }],
      });
    },
  },
  Mutation: {
    async createUser(_, { username, email, password }) {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    async loginUser(_, { usernameOrEmail, password }) {
      const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error('Wrong password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    async saveBook(_, { book }, { user }) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
    async deleteBook(_, { bookId }, { user }) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }
      return updatedUser;
    },
  },
  User: {
    savedBooks: async (parent) => {
      // Fetch the user's saved books from the database
      const user = await User.findById(parent._id).populate('savedBooks');
      return user.savedBooks;
    },
  },
};

module.exports = resolvers;
