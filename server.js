const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("MT700PDDB", "sa", "qwerty@1", {
  host: "172.16.73.146",
  port: "1433", // <----------------The port number you copied
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    options: {
      enableArithAbort: true,
      trustServerCertificate: true,
    },
  },
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (err) {
  console.error("Unable to connect to the database:", error);
}

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
