import React, { FC } from "react";
import { Flex, Box, BoxProps } from "@chakra-ui/react";
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
    <Flex h="100vh">
      <Sidebar />
      <Box flex={1}>
        <Box maxW={maxW} ml={20} px={{ base: 4, md: 8 }} {...props}>
          <Header />
          <Box>{children}</Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
