import { useSigner, useWalletContext, WalletProvider } from "@/lib/wallet";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { AndromedaProvider } from "@/lib/andrjs";
import { apolloClient } from "@/lib/graphql";
import theme from "@/theme";
import { ApolloProvider } from "@apollo/client";
import { GlobalModalProvider } from "@/modules/modals";

import "react-toastify/dist/ReactToastify.css";
//Import stylization setups for use in App-Builder
import "@/modules/app-builder/style/controls.css";
import "@/modules/app-builder/style/nodes.css";
import { configs } from "@andromedaprotocol/andromeda.js";

const Main = ({ Component, pageProps }: AppProps<Record<string, any>>) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const { chainId, signer } = useWalletContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <AndromedaProvider chainId={chainId} signer={signer}>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              pauseOnHover
              pauseOnFocusLoss
            />
            <GlobalModalProvider>
              <Component {...pageProps} />
            </GlobalModalProvider>
          </AndromedaProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

const MyApp = (props: AppProps) => (
  <WalletProvider chainId={configs[0].chainId}>
    <ApolloProvider client={apolloClient}>
      <Main {...props} />
    </ApolloProvider>
  </WalletProvider>
);

export default MyApp;
