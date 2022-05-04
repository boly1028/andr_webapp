import React, { FC } from "react";
import { Box, BoxProps, Flex, CloseButton } from "@chakra-ui/react";

import NavItem from "./NavItem";
import Logo from "./Logo";
import {
  CompassIcon,
  BookOpenIcon,
  CubeIcon,
  SparklesIcon,
  FolderOpenIcon,
} from "./icons";

interface LinkItemProps {
  name: string;
  icon: React.ReactNode;
  href: string;
}

const LinkItems: LinkItemProps[] = [
  { name: "Overview", icon: <CompassIcon boxSize={5} />, href: "/" },
  {
    name: "Market",
    icon: <SparklesIcon boxSize={5} />,
    href: "/explore",
  },
  { name: "Assets", icon: <FolderOpenIcon boxSize={5} />, href: "/assets" },
  { name: "Apps", icon: <CubeIcon boxSize={5} />, href: "/app-builder" },
  { name: "Learn", icon: <BookOpenIcon boxSize={5} />, href: "/learn" },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const Sidebar = ({ onClose, ...props }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg="gray.50"
      w={60}
      pos="fixed"
      h="full"
      px={4}
      {...props}
    >
      <Flex h={20} alignItems="center" justifyContent="space-between">
        <Logo />
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
