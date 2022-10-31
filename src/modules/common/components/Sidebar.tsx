import React, { FC } from "react";
import { Box, BoxProps, Flex, CloseButton, Image } from "@chakra-ui/react";

import NavItem from "./NavItem";
import Logo from "./Logo";
import {
  AppStore,
  CompassIcon,
  BookOpenIcon,
  CubeIcon,
  SparklesIcon,
  FolderOpenIcon,
} from "./icons";
import { SITE_LINKS } from "../utils/sitelinks";

interface LinkItemProps {
  name: string;
  icon: React.ReactNode;
  href: string;
}

const LinkItems: LinkItemProps[] = [
  // {
  //   name: "Overview",
  //   icon: <CompassIcon boxSize={5} />,
  //   href: SITE_LINKS.dashboard(),
  // },
  {
    name: "App Store",
    icon: <AppStore boxSize={5} />,
    href: SITE_LINKS.appStore(),
  },
  { name: "Create", icon: <CubeIcon boxSize={5} />, href: "#" },
  {
    name: "ADOs",
    icon: <CubeIcon boxSize={5} pl={8} />,
    href: SITE_LINKS.flexBuilderHome(),
  },
  {
    name: "Apps",
    icon: <CubeIcon boxSize={5} pl={8} />,
    href: SITE_LINKS.appBuilder(),
  },
  {
    name: "Assets",
    icon: <FolderOpenIcon boxSize={5} />,
    href: SITE_LINKS.assets(),
  },
  {
    name: "Embeddables",
    icon: <SparklesIcon boxSize={5} />,
    href: SITE_LINKS.embeddables(),
  },
  // {
  //   name: "Market",
  //   icon: <SparklesIcon boxSize={5} pl={8} />,
  //   href: "/explore",
  // },
  // {
  //   name: "Crowdfund",
  //   icon: <SparklesIcon boxSize={5} pl={8} />,
  //   href: "#",
  // },
  // {
  //   name: "Dashboards",
  //   icon: <SparklesIcon boxSize={5} pl={8} />,
  //   href: "#",
  // },
  {
    name: "Learn",
    icon: <BookOpenIcon boxSize={5} />,
    href: SITE_LINKS.learn(),
  },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const Sidebar = ({ onClose, ...props }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg="dark.50"
      w={60}
      pos="fixed"
      h="full"
      overflowY="auto"
      px={4}
      {...props}
    >
      <Flex h={20} alignItems="center" justifyContent="space-between">
        <Image src="/logo_header.png" w='60%' />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem key={link.name} href={link.href} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default Sidebar;
