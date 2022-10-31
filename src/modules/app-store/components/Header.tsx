import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";

interface HeaderProps {}
const Header: FC<HeaderProps> = (props) => {
  const {} = props;

  return (
    <Box bg="dark.50" rounded="lg" p="12">
      <Flex direction="row" gap="4">
        <VStack gap='4' maxW="lg" alignItems='start' pr='4'>
          <Text fontSize="4xl" maxW="md" fontWeight="bold">
            Build apps faster with templates
          </Text>
          <Text fontSize="base" color="dark.500">
            Build with ready-made apps and templates by Andromeda and the
            community.
          </Text>
        </VStack>
        <Box maxW='xs'>
            <Image src='/app-store/header.png' w='full'/>
        </Box>
      </Flex>
    </Box>
  );
};
export default Header;
