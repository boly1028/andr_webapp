import React, { FC } from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  BoxProps,
} from "@chakra-ui/react";

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
  { name: "Overview", icon: <CompassIcon boxSize={6} />, href: "/" },
  { name: "Market", icon: <SparklesIcon boxSize={6} />, href: "/market" },
  { name: "Assets", icon: <FolderOpenIcon boxSize={6} />, href: "/assets" },
  { name: "Missions", icon: <CubeIcon boxSize={6} />, href: "/missions" },
  { name: "Learn", icon: <BookOpenIcon boxSize={6} />, href: "/learn" },
];

type Props = {
  onClose: () => void;
} & BoxProps;

const SidebarContent: FC<Props> = ({ onClose, ...props }) => {
  return (
    <Box
      transition="3s ease"
      bg="#F9FAFB"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      px={4}
      {...props}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between">
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

export default SidebarContent;
