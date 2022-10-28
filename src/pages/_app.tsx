import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { CartProvider, OrderProvider, ScrollProvider } from "@contexts";
import { getApolloClient } from "../lib/Apollo/withApollo";
import "../styles/global.css";
import "react-loading-skeleton/dist/skeleton.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={getApolloClient(undefined)}>
      <CartProvider>
        <OrderProvider>
          <ScrollProvider>
            <Component {...pageProps} />
          </ScrollProvider>
        </OrderProvider>
      </CartProvider>
    </ApolloProvider>
  );
}

export default MyApp;
