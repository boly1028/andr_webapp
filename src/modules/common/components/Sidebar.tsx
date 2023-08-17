import React from "react";
import {
  Box,
  BoxProps,
  Flex,
  CloseButton,
  Image,
  Divider,
  Text,
  Avatar,
} from "@chakra-ui/react";

import NavItem from "./NavItem";
import {
  BookOpenIcon,
  CubeIcon,
  GlobeIcon,
  SparklesIcon,
  FolderOpenIcon,
  AppBuilder,
  CliIcon,
  CodeBrowser,
} from "./icons";
import { SITE_LINKS } from "../utils/sitelinks";
import Link from "next/link";

export enum ILinkItemKey {
  LEARN = "learn",
  ADO_BUILDER = "adobuilder",
  APP_BUILDER = "appbuilder",
  ASSETS = "assets",
  APP_STORE = "appstore",
  CLI = "cli",
  EMBEDDABLES = "embeddables",
  USER = 'user',
}
interface ILinkItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  key: ILinkItemKey;
}
const LinkItems: ILinkItem[] = [
  {
    name: "User",
    icon: <Avatar boxSize={5} />,
    href: SITE_LINKS.userHome(),
    key: ILinkItemKey.USER,
  },
  {
    name: "Learn",
    icon: <BookOpenIcon boxSize={5} />,
    href: SITE_LINKS.learn(),
    key: ILinkItemKey.LEARN,
  },
  {
    name: "ADO Builder",
    icon: <CubeIcon boxSize={5} />,
    href: SITE_LINKS.flexBuilderHome(),
    key: ILinkItemKey.ADO_BUILDER,
  },
  {
    name: "App Builder",
    icon: <AppBuilder boxSize={5} />,
    href: SITE_LINKS.appBuilder(),
    key: ILinkItemKey.APP_BUILDER,
  },
  {
    name: "Assets",
    icon: <FolderOpenIcon boxSize={5} />,
    href: SITE_LINKS.assets(),
    key: ILinkItemKey.ASSETS,
  },
  {
    name: "Embeddables",
    icon: <CodeBrowser boxSize={5} />,
    href: SITE_LINKS.embeddables(),
    key: ILinkItemKey.EMBEDDABLES,
  },
  {
    name: "App Store",
    icon: <SparklesIcon boxSize={5} />,
    href: SITE_LINKS.appStore(),
    key: ILinkItemKey.APP_STORE,
  },
  {
    name: "CLI",
    icon: <CliIcon boxSize={5} />,
    href: SITE_LINKS.cli(),
    key: ILinkItemKey.CLI,
  },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
  activeLink?: ILinkItemKey;
}

const Sidebar = ({ onClose, activeLink, ...props }: SidebarProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      transition="1s ease"
      bg="dark.50"
      w={60}
      pos="fixed"
      h="full"
      px="2"
      py="1"
      {...props}
    >
      <Flex h={20} pl="4" alignItems="center" justifyContent="space-between">
        <Link href={SITE_LINKS.landing()} passHref>

          <Image src="/logo_header.png" w="60%" />

        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box
        display="flex"
        flexDir="column"
        gap="1"
        flex="1"
        px={4}
        overflowY="auto"
        pb="2"
      >
        {LinkItems.map((link) => (
          <NavItem
            active={link.key === activeLink}
            gap="1"
            key={link.key}
            href={link.href}
            icon={link.icon}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
      <Divider justifySelf="end" />
      <Text pl="4" my="2" fontSize="xs" fontWeight="light" fontStyle="light" color="content.medium">
        Andromeda App - Beta
      </Text>
    </Box>
  );
};

export default Sidebar;
