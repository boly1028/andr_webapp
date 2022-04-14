import React, { FC } from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
} from "@chakra-ui/react";

import {
  Compass as CompassIcon,
  Wand as WandIcon,
  FolderOpen as FolderOpenIcon,
  Box as BoxIcon,
  BookOpen as BookOpenIcon,
} from "lucide-react";

import NavItem from "./NavItem";
import Logo from "./Logo";

interface LinkItemProps {
  name: string;
  icon: any;
  path: String;
}
const LinkItems: LinkItemProps[] = [
  { name: "Overview", icon: CompassIcon, path: "/" },
  { name: "Market", icon: WandIcon, path: "market" },
  { name: "Assets", icon: FolderOpenIcon, path: "assets" },
  { name: "Missions", icon: BoxIcon, path: "missions" },
  { name: "Learn", icon: BookOpenIcon, path: "learn" },
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
        <NavItem key={link.name} path={link.path} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
