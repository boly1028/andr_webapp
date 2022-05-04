import React, { FC } from "react";
import {
  Flex,
  Box,
  BoxProps,
  Drawer,
  DrawerContent,
  useDisclosure,
  FlexProps,
} from "@chakra-ui/react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import { Sidebar, Header } from "@/modules/common";

const Layout: FC<BoxProps> = ({
  children,
  maxW = "container.lg",
  ...props
}) => {
  const wallet = useWallet();
  const isInitializing = wallet.status == WalletStatus.INITIALIZING;

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isInitializing) {
    return <Flex h="100vh" />;
  }

  return (
    <Box minH="100vh">
      <Sidebar
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Flex ml={{ base: 0, md: 60 }} justify="center">
        <Box px={{ base: 4, md: 8 }} maxW={maxW} w="full">
          <Box>
            <Header onOpen={onOpen} />
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
