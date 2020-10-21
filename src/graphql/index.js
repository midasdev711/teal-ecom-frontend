import { ApolloClient,createHttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { GetToken } from '../utils';
let token = GetToken()
const httpLink = createHttpLink({
 //uri: "http://198.168.1.48:9200/graphql",
//  uri: "http://192.168.1.49:9200/graphql",
 uri: "http://localhost:9200/graphql",
});

const uploadLink = createUploadLink({ uri: "http://localhost:9200/graphql"})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.trim()}` : "",
    }
  }
});
export const apolloClient = new ApolloClient({
  // uri: 'https://api.teal.com/graphQL',
  // uri: 'https://api.juicypie.com/graphQL',
  // uri: 'https://teal-creative-ecom-backend.now.sh/',
  //uri: "http://localhost:9200/graphql",
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