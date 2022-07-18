import React, { FC } from "react";
import {
  Flex,
  Box,
  BoxProps,
  Drawer,
  DrawerContent,
  useDisclosure,
  FlexProps,
  Center,
} from "@chakra-ui/react";

import { Sidebar, Header } from "@/modules/common";
import {
  KeplrConnectionStatus,
  useWallet,
  useWalletContext,
} from "@/lib/wallet";

const Layout: FC<BoxProps> = ({
  children,
  maxW = "container.lg",
  ...props
}) => {
  const { status } = useWalletContext();
  const isInitializing = status === KeplrConnectionStatus.Connecting;

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isInitializing) {
    return <Box h="100vh" />;
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
      <Flex justify="center" w={"full"} minH="100vh">
        <Flex ml={{ base: 0, md: 60 }} direction={"column"} w="full">
          <Box
            px={{ base: 4, md: 8 }}
            maxW="container.lg"
            w="full"
            margin="0 auto"
          >
            <Header onOpen={onOpen} />
          </Box>
          <Box
            flex={1}
            px={{ base: 4, md: 8 }}
            maxW={maxW}
            w="full"
            {...props}
            margin="0 auto"
          >
            {children}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Layout;
