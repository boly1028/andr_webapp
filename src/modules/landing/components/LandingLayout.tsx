import React, { FC } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { LandingHeader } from ".";

interface LandingLayoutProps {}

const LandingLayout: FC<LandingLayoutProps> = ({ children }) => {
  return (
    <Box minH="100vh" bg="gray.100">
      <Flex direction={"column"} w="full">
        <Box px={{ base: 4, md: 8 }} w="full">
          <LandingHeader />
        </Box>
        <Box flex={1} w="full">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default LandingLayout;
