import React, { FC, useEffect, useState } from "react";
import {
  Flex,
  Box,
  BoxProps,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";

import { Header } from "@/modules/common";
import { ILinkItemKey } from "./sidebar/utils";
import { KeplrConnectionStatus, useAndromedaStore } from "@/zustand/andromeda";
import Sidebar from "./sidebar";
import { useAppStateStore } from "@/zustand/appState";
import ScrollToBottom from "./ScrollToBottom";
import ScrollToTop from "./ScrollToTop";
import { useRouter } from "next/router";
import AnimatedLogo from "./AnimatedLogo";

interface ILayoutProps extends BoxProps {
  activeLink?: ILinkItemKey
}

const Layout: FC<ILayoutProps> = ({
  activeLink,
  children,
  maxW = "container.lg",
  ...props
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url) => (url === router.asPath) && setLoading(false);

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  const status = useAndromedaStore(state => state.keplrStatus);
  const isInitializing = status === KeplrConnectionStatus.Connecting;

  const sidebarCollapse = useAppStateStore(state => state.sidebarCollapse);
  const sidebarWidth = sidebarCollapse ? 20 : 60

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isInitializing) {
    return <Box h="100vh" />;
  }

  return (
    <Box minH="100vh">
      <Sidebar
        activeLink={activeLink}
        onClose={() => onClose}
        display={{ base: "none", md: "flex" }}
        w={sidebarWidth}
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
          <Sidebar activeLink={activeLink} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Flex justify="center" w={"full"} minH="100vh">
        <Flex ml={{ base: 0, md: sidebarWidth }} direction={"column"} w="full">
          <Box
            px={{ base: 4, md: 8 }}
            w="full"
            margin="0 auto"
          >
            <Header onOpen={onOpen} />
          </Box>
          <Box
            flex={1}
            px={{ base: 4, md: 8 }}
            py={{ base: 2, md: 4 }}
            w="full"
            maxW="container.lg"
            {...props}
            margin="0 auto"
            position="relative"
          >
            <AnimatedLogo isLoading={loading} delay={500}>
              {children}
            </AnimatedLogo>
            <ScrollToBottom />
            <ScrollToTop />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Layout;
