const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

// The GraphQL schema in string form
const typeDefs = gql`
  type Query {
    books: [Book]
  }
  type Book {
    title: String
    author: String
  }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

// Put together a schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
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

// The GraphQL endpoint

// Start the server
app.listen(3000, () => {
  console.log("Go to http://localhost:3000/graphiql to run queries!");
});
