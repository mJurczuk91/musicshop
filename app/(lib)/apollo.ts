import { HttpLink } from "@apollo/client";
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
});