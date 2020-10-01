import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  // uri: 'https://api.teal.com/graphQL',
  uri: 'http://localhost:9200/graphql',
  cache: new InMemoryCache()
});

export default {
	apolloClient,
};