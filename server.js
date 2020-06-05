const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

// Put together a schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
  playground: {
    endpoint: `http://localhost:3000/graphql`,
    settings: {
      "editor.theme": "light",
    },
  },
});

// Initialize the app
const app = express();
app.use(cors());
app.use(bodyParser.json());
server.applyMiddleware({ app });

db.sequelize.authenticate();

db.sequelize.sync().then(() => {
  // Start the server
  app.listen(3000, () => {
    console.log("Go to http://localhost:3000/graphql to run queries!");
  });
});

// The GraphQL endpoint
