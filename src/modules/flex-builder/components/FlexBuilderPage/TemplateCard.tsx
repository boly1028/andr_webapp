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
import ClassifierIcon from "@/theme/icons/classifiers";

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
  return (
    <Box
      border="1px"
      borderColor={"dark.300"}
      rounded={"xl"}
      overflow={"hidden"}
      _hover={{
        bg: "dark.50",
      }}
    >
      <Flex direction="column" height="100%" p={4}>
        <Box>
          <HStack spacing={4}>
            <ClassifierIcon adoType={template.id} schemaClass="ado" />

            <Text fontSize="lg" fontWeight={600}>
              {template.name}
            </Text>
          </HStack>

          <Text color="dark.500" fontSize="sm" my={4}>
            {template.description}
          </Text>

          <List spacing={2}>
            {template.opts.map((opt) => (
              <ListItem key={opt}>
                <Text fontSize="sm" color="dark.500">
                  <ListIcon as={CheckIcon} color="primary.500" boxSize={5} />
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
