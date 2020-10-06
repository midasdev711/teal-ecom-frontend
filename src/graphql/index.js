import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  // uri: 'https://api.teal.com/graphQL',
  // uri: 'https://teal-creative-ecom-backend.now.sh/',
 
  //uri: "http://localhost:9200/graphql",
  uri: "http://192.168.1.49:9200/graphql",
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