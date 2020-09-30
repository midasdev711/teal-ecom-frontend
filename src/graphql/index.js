import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
 // uri: 'https://api.teal.com/graphQL',
  // uri: 'http://localhost:3010/ecomm/graphql',
  uri:"http://localhost:9200/ecom/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Article: {
        keyFields: ['ID']
      }
    }
  })
});

export default {
  apolloClient,
};