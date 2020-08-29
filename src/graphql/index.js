import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://api.teal.com/graphQL',
  cache: new InMemoryCache()
});

export default {
	apolloClient,
};