import NextLink from "next/link";
import { Box, Flex, Center, Button, Heading, VStack } from "@chakra-ui/react";

import { PageHeader, PlusIcon, CubeIcon } from "@/modules/common";

const AppBuilderPage = () => {
  return (
    <Flex h="100%" direction="column">
      <PageHeader
        title="Apps"
        desc="Missions will allow chained ADOs to execute complex sets of events."
      />
      <Box flex={1} bg="gray.50" my={10}>
        <Center w={"100%"} h={"100%"}>
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
    </Flex>
  );
};

export default AppBuilderPage;
