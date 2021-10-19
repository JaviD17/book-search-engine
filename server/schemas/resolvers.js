const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resovlers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({}).select("-__v -password");
        // .populate('books');

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { userId, input }, context) => {
      if (context.user) {
        const book = await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              savedBooks: { input },
            },
          },
          { new: true, runValidators: true }
        );
        return book;
      }
    },
    removeBook: async (parent, { userId, bookId }, context) => {
      if (context.user) {
        const book = await User.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              savedBooks: { bookId },
            },
          },
          { new: true }
        );
        return book;
      }
    },
  },
};

module.exports = resovlers;
