import type { AppProps } from "next/app";
import { ScrollProvider } from "../contexts/ScrollContext";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ScrollProvider>
      <Component {...pageProps} />
    </ScrollProvider>
  );
}

export default MyApp;
