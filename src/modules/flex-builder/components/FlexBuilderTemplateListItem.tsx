import React, { FC } from "react";

import NextLink from "next/link";

import { FlexBuilderTemplateProps } from "@/modules/flex-builder/types";

import {
  Box,
  Circle,
  Flex,
  Spacer,
  Text,
  List,
  ListItem,
  ListIcon,
  Button,
  Icon,
  useColorModeValue,
  Heading,
  HStack,
} from "@chakra-ui/react";

import { Image as ImageIcon } from "lucide-react";

import { CheckIcon, ChevronRightIcon } from "@/modules/common";

type FlexBuilderTemplateListItemProps = {
  template: FlexBuilderTemplateProps;
};

const FlexBuilderTemplateListItem: FC<FlexBuilderTemplateListItemProps> = ({
  template,
}) => {
  const wrapperBg = useColorModeValue("white", "gray.800");
  const containerBg = useColorModeValue("white", "gray.900");
  const titleColor = useColorModeValue("gray.700", "white");

  return (
    <Box
      bg={wrapperBg}
      border="1px"
      borderColor={"gray.300"}
      rounded={"xl"}
      overflow={"hidden"}
    >
      <Flex direction="column" height="100%" bg={containerBg} p={4}>
        <Box>
          <HStack spacing={4}>
            <Circle size="36px" bg="primary.600" color="white">
              <Icon as={ImageIcon} />
            </Circle>

            <Text color={titleColor} fontSize="lg" fontWeight={600}>
              {template.name}
            </Text>
          </HStack>

          <Text color="gray.500" fontSize="sm" my={4}>
            {template.description}
          </Text>

          <List spacing={2}>
            {template.opts.map((opt) => (
              <ListItem key={opt}>
                <Text color={"gray.500"} fontSize="sm">
                  <ListIcon as={CheckIcon} color="purple.400" boxSize={5} />
                  {opt}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
        <Spacer />
        <NextLink href={`flex-builder/${template.id}`} passHref>
          <Button
            as="a"
            mt={10}
            isFullWidth
            size="lg"
            colorScheme="purple"
            rightIcon={
              !template.disabled ? <ChevronRightIcon boxSize={5} /> : undefined
            }
            isDisabled={template.disabled}
          >
            {template.disabled ? "Coming Soon" : "Get Started"}
          </Button>
        </NextLink>
      </Flex>
    </Box>
  );
};

export default FlexBuilderTemplateListItem;
