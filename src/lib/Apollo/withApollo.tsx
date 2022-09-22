import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import { repositoryName } from "../../../prismicio";
import * as prismic from "@prismicio/client";
import { createPrismicLink } from "apollo-link-prismic";

export const withApollo = (Component: any) => {
  return function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
        <Component />
      </ApolloProvider>
    );
  };
};

export type ApolloClientContext = GetServerSidePropsContext;

export function getApolloClient(
  ctx?: ApolloClientContext,
  ssrCache?: NormalizedCacheObject,
) {
  const httpLink = createPrismicLink({
    uri: prismic.getGraphQLEndpoint(repositoryName),
  });

  const cache = new InMemoryCache().restore(ssrCache ?? {});

  return new ApolloClient({
    link: httpLink,
    cache,
  });
}
