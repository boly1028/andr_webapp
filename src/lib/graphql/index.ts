import { TypedFieldPolicy } from "@andromedaprotocol/gql";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export * from "./hooks";

/**
 * Apollo client used for queries, may require some state usage later
 */
export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  'defaultOptions': {
    'query': {
      'notifyOnNetworkStatusChange': true,
    }
  },
  cache: new InMemoryCache({
    typePolicies: {
      ...TypedFieldPolicy
    }
  }),
});
