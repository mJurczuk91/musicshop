/* import { HttpLink } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";


export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      typePolicies: {
        CategoryEntity: {
          fields: {
            attributes: {
              merge: true,
            }
          }
        }
      }
    }),
    link: new HttpLink({
      uri: "https://m-jurczuk.pl/graphql",
      headers: {
        authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    }),
  });
}); */

import {
  ApolloClient,
  HttpLink,
  InMemoryCache
} from '@apollo/client';

import { HOST_URL } from './helpers';

const client = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: `${HOST_URL}/graphql`,
    headers: {
      authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  }
  ),
  cache: new InMemoryCache({
    typePolicies: {
      CategoryEntity: {
        fields: {
          attributes: {
            merge: true,
          }
        }
      }
    }
  }),
});

export default client;