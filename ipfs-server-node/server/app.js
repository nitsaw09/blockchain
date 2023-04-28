const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const ethers = require('ethers');

// Define the GraphQL schema
const schema = buildSchema(`
  type Query {
    verifySignature(message: String!, signature: String!, address: String!): Boolean!
  }
`);

// Define the root resolver
const root = {
  verifySignature: async ({ message, signature, address }) => {
    // const messageHash = ethers.utils.hashMessage(message);
    // const sig = ethers.utils.splitSignature(signature);
    // const recoveredAddress = ethers.utils.recoverAddress(messageHash, sig);
    return true;
  }
};

// Create the Express app
const app = express();

// Add the GraphQL middleware to handle requests
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: false  // Set this option to false to disable GraphiQL interface and get response in JSON format
}));

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
