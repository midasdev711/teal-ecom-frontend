import { ApolloClient } from 'apollo-client';
import { split, ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import withApollo from 'next-with-apollo';
import { HttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';
import { SERVER } from './config';

let authToken = null;

const httpLink = new HttpLink({
  fetch,
  uri: SERVER,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: authToken || null,
    },
  });
  // Add onto payload for WebSocket authentication
  operation.authToken = authToken;

  return forward(operation);
});

/**
 * Set Token
 * @param token
 */
export const setToken = async (token) => {
  try {
    authToken = token ? `Bearer ${token}` : null;
    Cookies.set('token', authToken, { expires: 7 });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Set Token In Request
 * @param token
 */
export const setTokenInRequest = async (token) => {
  try {
    authToken = token ? token : null;
    return authToken;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Destroy Token
 * For logout purpose
 */
export const destroyToken = async () => {
  try {
    Cookies.remove('token');
    authToken = null;
  } catch (error) {
    console.log(error);
  }
};

const link = process.browser
  ? split(({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  }, httpLink)
  : httpLink;


const uploadLink = createUploadLink({ uri: SERVER })

export default withApollo(
  ({ initialState }) => {
   // console.log('initialState', initialState);
    return new ApolloClient({
      link: concat(authMiddleware, uploadLink, link),
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
      }).restore(initialState || {}),
    })
  }
);
