import { Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { LandingHero } from ".";

interface LandingPageProps {}
const LandingPage: FC<LandingPageProps> = () => {
  return (
    <Flex direction="column" w="full">
      <LandingHero />
    </Flex>
  );
};

export default LandingPage;
