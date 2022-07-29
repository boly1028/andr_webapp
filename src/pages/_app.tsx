import { useSigner, WalletProvider } from "@/lib/wallet";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import App, { AppContext, AppProps } from "next/app";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { AndromedaProvider } from "@/lib/andrjs";
import { apolloClient } from "@/lib/graphql";
import theme from "@/theme";
import "react-toastify/dist/ReactToastify.css";

//Import stylization setups for use in App-Builder
import "@/modules/app-builder/style/controls.css";
import "@/modules/app-builder/style/nodes.css";
import { ApolloProvider } from "@apollo/client";

const Main = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const signer = useSigner();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <AndromedaProvider chainId="uni-3" signer={signer}>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              pauseOnHover
              pauseOnFocusLoss
            />
            <Component {...pageProps} />
          </AndromedaProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

const MyApp = (props: AppProps) => (
  <WalletProvider chainId="uni-3">
    <ApolloProvider client={apolloClient}>
      <Main {...props} />
    </ApolloProvider>
  </WalletProvider>
);

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return appProps;
};

export default MyApp;
