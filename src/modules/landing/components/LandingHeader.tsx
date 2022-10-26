import React, { FC } from "react";
import { Flex, HStack, Link as _Link } from "@chakra-ui/react";
import { Create, Wallet } from "@/modules/common";

interface LandingHeaderProps {}

const LandingHeader: FC<LandingHeaderProps> = () => {
  return (
    <Flex
      height="20"
      alignItems="center"
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <HStack spacing={2}>
            <Create />
            <Wallet />
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default LandingHeader;
