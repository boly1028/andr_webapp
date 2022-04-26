import React, { FC } from "react";
import {
  Flex,
  HStack,
  useColorModeValue,
  IconButton,
  FlexProps,
  Button,
} from "@chakra-ui/react";

import { Menu as MenuIcon } from "lucide-react";

import { PlusIcon, TerraWallet } from "@/modules/common";

type Props = {
  onOpen: () => void;
} & FlexProps;

const Header: FC<Props> = ({ onOpen, ...props }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={4}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...props}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<MenuIcon />}
      />

      <HStack spacing={{ base: "0", md: "2" }}>
        <Button
          leftIcon={<PlusIcon boxSize={5} />}
          variant="outline"
          size="lg"
          borderRadius="xl"
        >
          Create
        </Button>
        <TerraWallet />
      </HStack>
    </Flex>
  );
};

export default Header;
