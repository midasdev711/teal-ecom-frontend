import { ApolloClient,createHttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { GetToken } from '../utils';
import { SERVER } from '../config/config';

let token = GetToken()
const httpLink = createHttpLink({
// uri: "http://198.168.1.48:9200/graphql",
uri: SERVER,
 // uri: "http://localhost:9200/graphql",
});

const uploadLink = createUploadLink({ uri: SERVER})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.trim()}` : "",
    }
  }
});
export const apolloClient = new ApolloClient({
  // uri: 'https://api.juicypie.com/graphQL',
  // uri: 'https://teal-creative-ecom-backend.now.sh/',
  uri: "http://3.135.208.27:9200/graphql",
  link: authLink.concat(uploadLink, httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Article: {
        keyFields: ['ID']
      },
      Product: {
        keyFields: ['ID']
      },
      MyProductType: {
        keyFields: ['ID']
      },
    }
  })
});

export default {
  apolloClient,
};