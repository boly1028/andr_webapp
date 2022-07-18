import { useSigner, WalletProvider } from "@/lib/wallet";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import {
  getChainOptions,
  WalletControllerChainOptions,
} from "@terra-money/wallet-provider";
import App, { AppContext, AppProps } from "next/app";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

import { AndromedaContextProvider } from "@/modules/common";
import { AndromedaProvider } from "@/lib/andrjs";
import theme from "@/theme";

//Import stylization setups for use in App-Builder
import "@/modules/app-builder/style/controls.css";
import "@/modules/app-builder/style/nodes.css";

const Main = ({
  Component,
  pageProps,
}: AppProps & WalletControllerChainOptions) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const signer = useSigner();
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <AndromedaProvider chainId="uni-3" signer={signer}>
            <Component {...pageProps} />
          </AndromedaProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

const MyApp = (props: AppProps & WalletControllerChainOptions) => (
  <WalletProvider chainId="uni-3">
    <Main {...props} />
  </WalletProvider>
);

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const chainOptions = await getChainOptions();
  return { ...appProps, ...chainOptions };
};

export default MyApp;
