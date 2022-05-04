import React, { FC } from "react";
import { Flex, HStack, Button, FlexProps, IconButton } from "@chakra-ui/react";

import { PlusIcon, TerraWallet, MenuIcon } from "@/modules/common";

type Props = {
  onOpen: () => void;
} & FlexProps;

const Header: FC<Props> = ({ onOpen, ...props }) => {
  return (
    <Flex
      height="20"
      alignItems="center"
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
      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <HStack spacing={2}>
            <Button
              leftIcon={<PlusIcon boxSize={5} />}
              variant="outline"
              size="lg"
            >
              Create
            </Button>
            <TerraWallet />
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Header;
