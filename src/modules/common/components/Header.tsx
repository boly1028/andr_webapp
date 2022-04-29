import React, { FC } from "react";
import { Flex, HStack, Button } from "@chakra-ui/react";

import { PlusIcon, TerraWallet } from "@/modules/common";

const Header: FC = () => {
  return (
    <Flex height={20} align="center" justify="flex-end">
      <HStack spacing={2}>
        <Button leftIcon={<PlusIcon boxSize={5} />} variant="outline" size="lg">
          Create
        </Button>
        <TerraWallet />
      </HStack>
    </Flex>
  );
};

export default Header;
