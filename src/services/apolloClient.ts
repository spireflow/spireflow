import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

/**
 * Apollo Client instance for GraphQL API communication.
 * Configured with GRAPHQL_URL env variable and cache-first strategy.
 *
 * Used by getData() service to fetch dashboard data when backend is available.
 * Falls back to mock data if GRAPHQL_URL is not configured (standalone mode).
 */
export const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.GRAPHQL_URL }),
  cache: new InMemoryCache(),
});

client.defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
    errorPolicy: "all",
  },
  query: {
    fetchPolicy: "cache-first",
    errorPolicy: "all",
  },
};
