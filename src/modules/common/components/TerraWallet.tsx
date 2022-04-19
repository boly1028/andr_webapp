import React, { FC } from "react";
import {
  useWallet,
  WalletStatus,
  useConnectedWallet,
} from "@terra-money/wallet-provider";
import { Text, HStack, useDisclosure, Box, Button } from "@chakra-ui/react";

import { WalletModal } from "@/modules/modals";

const TerraWallet: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status, disconnect } = useWallet();
  const wallet = useConnectedWallet();

  if (status === WalletStatus.WALLET_CONNECTED) {
    return (
      <Box>
        <HStack spacing="3">
          <Text variant="light">{wallet?.terraAddress}</Text>
          <Button type="button" onClick={disconnect}>
            Logout
          </Button>
        </HStack>
      </Box>
    );
  }

  return (
    <>
      <Button type="button" onClick={onOpen}>
        Connect your wallet
      </Button>
      <WalletModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default TerraWallet;
