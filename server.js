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
  Query: { books: async () => sequelize.books.findAll() },
};

// Put together a schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // modules: [require("./models/index")],
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
