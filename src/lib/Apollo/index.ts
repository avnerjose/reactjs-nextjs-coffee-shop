import { ApolloClient, InMemoryCache } from "@apollo/client";
import { repositoryName } from "../../../prismicio";
import { createPrismicLink } from "apollo-link-prismic";
import * as prismic from "@prismicio/client";

const client = new ApolloClient({
  link: createPrismicLink({
    uri: prismic.getGraphQLEndpoint(repositoryName),
  }),
  cache: new InMemoryCache(),
});

export { client };
