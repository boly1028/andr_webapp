import { ApolloClient, InMemoryCache } from "@apollo/client";

export * from "./hooks";

/**
 * Apollo client used for queries, may require some state usage later
 */
export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          assets: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: ['walletAddress'],

            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing, incoming, { args }) {
              const offset = args?.offset ?? 0;
              // Slicing is necessary because the existing data is
              // immutable, and frozen in development.
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[offset + i] = incoming[i];
              }
              return merged;
            },
          }
        }
      }
    }
  }),
});
