const { User } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent,args,context) => {
        if (context.user) {
            return User.find({_id: context.user._id});

        }
       throw AuthenticationError;
    },
  },
  Mutation: {
    login: async (parent, {email,password}) => {
        const user = await User.findOne({email});
        if (!user) {
            throw AuthenticationError;
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
            throw AuthenticationError;
        }
        const token = signToken(user);
        return {token, user};
      
    },
    addUser: async (parent,{username, email, password}) => {
      const user = await User.create({username,email, password});
      console.log(user);
        // const token = signToken(user);
        // return {token, user};
    },
    saveBook: async () => {
      
    },
    removeBook: async () => {
      
    },
  },
};

module.exports = resolvers;
