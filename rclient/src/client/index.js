const { ApolloClient, InMemoryCache } = require("@apollo/client");

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache({
    // Defining unique keys
    typePolicies: {
      User: {
        keyFields: ["_id"],
      },
    },
  }),
});

export default client;
