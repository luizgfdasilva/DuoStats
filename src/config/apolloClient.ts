import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
const RIOT_API_BASE_URL = 'https://americas.api.riotgames.com';

const restLink = new RestLink({
  uri: RIOT_API_BASE_URL,
  headers: {
    'X-Riot-Token': import.meta.env.VITE_RIOT_API_KEY || '',
  },
  customFetch: (uri, options) => {
    console.log('Fetching:', uri);
    return fetch(uri, options);
  },
});

export const apolloClient = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
