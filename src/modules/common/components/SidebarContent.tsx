import React, { FC } from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  BoxProps,
} from "@chakra-ui/react";
import {
  Compass as CompassIcon,
  Wand as WandIcon,
  FolderOpen as FolderOpenIcon,
} from "lucide-react";

import NavItem from "./NavItem";
import Logo from "./Logo";

interface LinkItemProps {
  name: string;
  icon: any;
  href: string;
}
const LinkItems: LinkItemProps[] = [
  { name: "Overview", icon: CompassIcon, href: "/" },
  { name: "Market", icon: WandIcon, href: "/market" },
  { name: "Assets", icon: FolderOpenIcon, href: "/assets" },
];

type Props = {
  onClose: () => void;
} & BoxProps;

const SidebarContent: FC<Props> = ({ onClose, ...props }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("gray.100", "gray.900")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...props}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
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
