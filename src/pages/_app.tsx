import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { CartProvider } from "../contexts/CartContext";
import { ScrollProvider } from "../contexts/ScrollContext";
import { withApollo, getApolloClient } from "../lib/Apollo/withApollo";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={getApolloClient(undefined)}>
      <CartProvider>
        <ScrollProvider>
          <Component {...pageProps} />
        </ScrollProvider>
      </CartProvider>
    </ApolloProvider>
  );
}

export default MyApp;
