import React, { FC } from "react";
import { Flex, Box, BoxProps, VStack } from "@chakra-ui/react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import { Sidebar, Header } from "@/modules/common";

const Layout: FC<BoxProps> = ({
  children,
  maxW = "container.lg",
  ...props
}) => {
  const wallet = useWallet();
  const isInitializing = wallet.status == WalletStatus.INITIALIZING;

  if (isInitializing) {
    return <Flex h="100vh" />;
  }

  return (
    <Flex h="99vh">
      <Sidebar />
      <Box h="100%" w="100%">
        <Box
          maxW={maxW}
          ml={20}
          px={{ base: 4, md: 8 }}
          h="100%"
          w="100%"
          {...props}
        >
          <Flex direction="column" w="100%" h="100%">
            <Header />
            <Box h="100%" w="100%">
              {children}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
