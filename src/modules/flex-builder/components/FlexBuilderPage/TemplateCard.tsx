import React, { FC } from "react";

import {
  Box,
  Circle,
  Flex,
  Spacer,
  Text,
  List,
  ListItem,
  ListIcon,
  Icon,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";

import { Image as ImageIcon } from "lucide-react";

import { CheckIcon } from "@/modules/common";
import { ITemplate } from "@/lib/schema/types";

/**
 * A Wrapper component for template cards in Flex Builder display Page.
 * It helps in creating consistent and reusable component for flex builder cards
 * @param {template} FlexBuilderTemplateProps
 * @param {children} ReactChildren Components to render at bottom of card (like CTA button, Links, etc)
 */

type TemplateCardProps = {
  template: ITemplate;
};

const TemplateCard: FC<TemplateCardProps> = ({ template, children }) => {
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

        {/* Display child component here. Currently its CTA button and Links only but it can be anything */}
        {children}
      </Flex>
    </Box>
  );
};

export default TemplateCard;
