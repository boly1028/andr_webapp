import {
  ChakraProvider,
  CSSReset,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { apolloClient } from "@/lib/graphql";
import theme, { ThemeStorageManager } from "@/theme";
import { ApolloProvider } from "@apollo/client";
import { GlobalModalProvider } from "@/modules/modals";

import { initiateKeplr } from "@/zustand/andromeda";
import "react-toastify/dist/ReactToastify.css";
import "@andromedaprotocol/design-theme/css/globals.css"
import 'highlight.js/styles/atom-one-dark.min.css';

import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
hljs.registerLanguage('json', json);


const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    initiateKeplr();
  }, [])

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
        <ChakraProvider theme={theme} colorModeManager={ThemeStorageManager}>
          <GlobalModalProvider>
            <CSSReset />
            <Component {...pageProps} />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              pauseOnHover
              pauseOnFocusLoss
            />
          </GlobalModalProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
