import React, { FC } from "react";
import NextLink from "next/link";
import { Box, Center, Button, Heading, VStack } from "@chakra-ui/react";

import { PageHeader, PlusIcon, CubeIcon } from "@/modules/common";

interface AppBuilderPageProps {}

const AppBuilderPage: FC<AppBuilderPageProps> = ({}) => {
  return (
    <Box h="100%">
      <PageHeader
        title="Apps"
        desc="Missions will allow chained ADOs to execute complex sets of events."
      />
      <Center h="100%" w="100%">
        <VStack spacing={25}>
          <CubeIcon boxSize={55} opacity="0.25" />
          <Heading size="md" fontWeight="600">
            You have no App
          </Heading>
          <NextLink href={`app-builder/create`} passHref>
            <Button
              as="a"
              leftIcon={<PlusIcon boxSize={4} />}
              colorScheme="purple"
              size="lg"
            >
              Create a new App
            </Button>
          </NextLink>
        </VStack>
      </Center>
    </Box>
  );
};

export default AppBuilderPage;
