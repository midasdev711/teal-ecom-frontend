import { ApolloClient,createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GetToken } from '../utils';
let token = GetToken()
const httpLink = createHttpLink({
 // uri: "http://192.168.1.49:9200/graphql",
  uri: "http://localhost:9200/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
 
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.trim()}` : "",
    }
  }
});
export const apolloClient = new ApolloClient({
  // uri: 'https://api.teal.com/graphQL',
  uri: 'http://localhost:9200/graphql',
  cache: new InMemoryCache()
});

export default {
  apolloClient,
};