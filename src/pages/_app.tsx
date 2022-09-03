import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { CartProvider } from "../contexts/CartContext";
import { OrderProvider } from "../contexts/OrderContext";
import { ScrollProvider } from "../contexts/ScrollContext";
import { withApollo, getApolloClient } from "../lib/Apollo/withApollo";
import "../styles/global.css";

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
