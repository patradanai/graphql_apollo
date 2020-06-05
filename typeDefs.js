const { gql } = require("apollo-server-express");
// The GraphQL schema in string form
const typeDefs = gql`
  type Query {
    lists: [List!]
  }
  type List {
    No: String
    Block: String
    Trouble: String
    Cause: String
  }
`;

module.exports = typeDefs;
