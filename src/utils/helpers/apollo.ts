import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { fetchAuthSession } from 'aws-amplify/auth';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_FQDN,
});

const authLink = setContext(async (_, { headers }) => {
  const { tokens } = await fetchAuthSession();
  const token = tokens?.idToken?.toString();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export { apolloClient };
