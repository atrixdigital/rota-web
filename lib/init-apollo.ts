import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from "apollo-boost";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import FlashMessage from "./FlashMessage";
import { isBrowser } from "./isBrowser";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

interface Options {
  getToken: () => string;
}

function create(initialState: any, { getToken }: Options) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_SERVER_URL + "/graphql",
    credentials: "include"
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );

        if (isBrowser && message.includes("not authenticated")) {
          Router.replace("/auth/login");
        }
        if (isBrowser) {
          const flassMessage = new FlashMessage(message);
          flassMessage.show();
        }
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        cookie: token ? `qid=${token}` : ""
      }
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache().restore(initialState || {})
  });
  // return new ApolloClient({
  //   connectToDevTools: isBrowser,
  //   ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
  //   link: new HttpLink({
  //     uri: process.env.REACT_APP_SERVER_URL + "/graphql", // Server URL (must be absolute)
  //     credentials: "include" // Additional fetch() options like `credentials` or `headers`
  //   }),
  //   cache: new InMemoryCache().restore(initialState || {})
  // });
}

export default function initApollo(initialState: any, options: Options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
