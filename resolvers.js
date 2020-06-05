// The resolvers
const resolvers = {
  Query: {
    lists: async (root, args, { db }) => await db.NMPSC_TROUBLE.findAll(),
  },
};

module.exports = resolvers;
