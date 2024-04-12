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
    async saveBook (_, { bookId, title, description, userId }) {
      try {
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }

        // Check if the book is already saved
        const existingBookIndex = user.savedBooks.findIndex(book => book.bookId === bookId);
        if (existingBookIndex !== -1) {
          throw new Error('Book already saved');
        }

        // Add the new book to the user's savedBooks array
        user.savedBooks.push({ bookId, title, description });

        // Save the user with the new book
        await user.save();

        // Return the updated user
        return user;
      } catch (error) {
        throw new Error(`Failed to save book: ${error.message}`);
      }
    },
    async deleteBook(_, { bookId }, { userId } ) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
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
