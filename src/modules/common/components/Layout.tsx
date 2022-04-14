import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import { Sidebar } from "@/modules/common";

const Layout: FC = ({ children }) => {
  const wallet = useWallet();
  const isInitializing = wallet.status == WalletStatus.INITIALIZING;

  if (isInitializing) {
    return null;
  }

  return (
    <Box minH="100vh">{!isInitializing && <Sidebar>{children}</Sidebar>}</Box>
  );
};

export default Layout;
