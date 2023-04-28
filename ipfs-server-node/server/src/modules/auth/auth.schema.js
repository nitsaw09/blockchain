const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    verifySignature(signature: String!): Boolean
  }
`);

module.exports = schema;