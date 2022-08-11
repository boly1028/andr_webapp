import React, { FC } from "react";
import {
  Flex,
  Box,
  Image,
  VStack,
  Text,
  HStack,
  Icon,
} from "@/theme/ui-elements";
import { AlertCircleIcon } from ".";
interface PagePlaceholderProps {
  imageUrl: string;
  description: string;
}
const PagePlaceholder: FC<PagePlaceholderProps> = (props) => {
  const { imageUrl, description } = props;

  return (
    <Box>
      <Flex direction="column" alignItems="center">
        <Image src={imageUrl} w="full" />
        <Box maxW='md' position="fixed" top="24" bg='white' border='1px' borderColor='gray.300' rounded='xl' p='4'>
          <VStack>
            <HStack>
              <Icon color='yellow.500' as={AlertCircleIcon} />
              <Text fontWeight='bold' fontSize='lg'>Coming Soon!</Text>
            </HStack>
            <Text whiteSpace='pre-line' fontSize='xs' fontWeight='light' textAlign='center'>
                {description}
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default PagePlaceholder;
