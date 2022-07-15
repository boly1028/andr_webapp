import React from "react";
import {
  WalletControllerChainOptions,
  getChainOptions,
} from "@terra-money/wallet-provider";
import App, { AppProps, AppContext } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { WalletProvider } from "@/lib/wallet";

import { AndromedaContextProvider } from "@/modules/common";
import theme from "@/theme";

//Import stylization setups for use in App-Builder
import "@/modules/app-builder/style/controls.css";
import "@/modules/app-builder/style/nodes.css";

const MyApp = ({
  Component,
  pageProps,
  defaultNetwork,
  walletConnectChainIds,
}: AppProps & WalletControllerChainOptions) => {
  const [queryClient] = React.useState(() => new QueryClient());

  const main = (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <AndromedaContextProvider>
            <Component {...pageProps} />
          </AndromedaContextProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );

  // return typeof window !== "undefined" ? (
  //   <WalletProvider chainId="uni-3">{main}</WalletProvider>
  // ) : (
  //   <StaticWalletProvider defaultNetwork={defaultNetwork}>
  //     {main}
  //   </StaticWalletProvider>
  // );
  return <WalletProvider chainId="uni-3">{main}</WalletProvider>;
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const chainOptions = await getChainOptions();
  return { ...appProps, ...chainOptions };
};

export default MyApp;
