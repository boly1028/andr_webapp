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

import {
  Check as CheckIcon,
  Image as ImageIcon,
  ArrowRight as ArrowRightIcon,
} from "lucide-react";

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
            <Circle size="36px" bg="purple.600" color="white">
              <Icon as={ImageIcon} color="white" />
            </Circle>
            <Heading
              color={titleColor}
              fontSize={"xl"}
              fontFamily={"body"}
              fontWeight={600}
            >
              {template.name}
            </Heading>
          </HStack>
          <Text color="gray.500" fontSize="sm" my={4}>
            {template.description}
          </Text>

          <List spacing={3}>
            {template.opts.map((opt) => (
              <ListItem key={opt}>
                <Text color={"gray.500"} fontSize="sm">
                  <ListIcon as={CheckIcon} color="purple.400" />
                  {opt}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
        <Spacer />
        <NextLink href={`flex-builder/${template.id}`} passHref>
          <Button
            mt={10}
            isFullWidth
            size="lg"
            colorScheme="purple"
            rightIcon={template.disabled ? undefined : <ArrowRightIcon />}
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
