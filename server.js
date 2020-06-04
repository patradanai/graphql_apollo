const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const db = require("./models");

// The GraphQL schema in string form
const typeDefs = gql`
  type Query {
    books: [NPMSC_TROUBLE]
  }
  type NPMSC_TROUBLE {
    No: String
    Block: String
    Trouble: String
    Cause: String
  }
`;

// The resolvers
const resolvers = {
  Query: { books: async () => await models.List.findAll() },
};

// Put together a schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: db.models,
  playground: {
    endpoint: `http://localhost:3000/graphql`,
    settings: {
      "editor.theme": "light",
    },
  },
});

// Initialize the app
const app = express();

server.applyMiddleware({ app });

try {
  db.sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (err) {
  console.error("Unable to connect to the database:", err);
}

db.sequelize.sync().then();

// The GraphQL endpoint

// Start the server
app.listen(3000, () => {
  console.log("Go to http://localhost:3000/graphiql to run queries!");
});
