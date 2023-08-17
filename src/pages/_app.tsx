import { useWalletContext, WalletProvider } from "@/lib/wallet";
import {
  ChakraProvider,
  CSSReset,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { AndromedaProvider } from "@/lib/andrjs";
import { apolloClient } from "@/lib/graphql";
import theme, { ThemeStorageManager } from "@/theme";
import { ApolloProvider } from "@apollo/client";
import { GlobalModalProvider } from "@/modules/modals";

import "react-toastify/dist/ReactToastify.css";
import { DEFAULT_CHAIN } from "@/constants/constants";

const Main = ({ Component, pageProps }: AppProps<Record<string, any>>) => {
  const { chainId, signer } = useWalletContext();

  return (
    <AndromedaProvider chainId={chainId} signer={signer}>
      <GlobalModalProvider>
        <Component {...pageProps} />
      </GlobalModalProvider>
    </AndromedaProvider>
  );
};

const MyApp = (props: AppProps) => {
  const queryClient = React.useMemo(() => new QueryClient({
    'defaultOptions': {
      'queries': {
        staleTime: 1000 * 60 * 5,
      }
    }
  }), []);

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider chainId={DEFAULT_CHAIN}>
          <ChakraProvider theme={theme} colorModeManager={ThemeStorageManager}>
            <CSSReset />
            <Main {...props} />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              pauseOnHover
              pauseOnFocusLoss
            />
          </ChakraProvider>
        </WalletProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
