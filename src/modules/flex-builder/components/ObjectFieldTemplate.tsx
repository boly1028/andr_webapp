import React from "react";

import {
  Box,
  Circle,
  Grid,
  GridItem,
  Switch,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Icon,
  IconButton,
  HStack,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";

import { Image as ImageIcon } from "lucide-react";

import { ObjectFieldTemplateProps } from "@rjsf/core";
import { utils } from "@rjsf/core";

import { Trash2 as DeleteIcon } from "lucide-react";

import AddButton from "./AddButton";
import { has } from "lodash";

const { canExpand } = utils;

const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const {
    DescriptionField,
    description,
    TitleField,
    title,
    properties,
    required,
    disabled,
    readonly,
    uiSchema,
    idSchema,
    schema,
    formData,
    onAddClick,
    formContext,
  } = props;

  const hasWrapper = formData["$removable"] !== undefined;
  // @ts-expect-error - TODO
  const hasGroup = schema["ui:options"]?.["group"];

  if (hasWrapper) {
    const defaultIndex = formData["$removable"] ? -1 : 0;
    return (
      /**
       *  Add wrapper
       */
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Accordion allowToggle defaultIndex={defaultIndex}>
          <AccordionItem borderTop={0} borderBottom={0}>
            <h2>
              <AccordionButton bg="gray.50">
                <Box flex="1" textAlign="left">
                  <HStack spacing={4}>
                    <Circle size="36px" bg="blue.300" color="white">
                      <Icon as={ImageIcon} color="white" />
                    </Circle>
                    <VStack align="left" spacing={1}>
                      <Heading
                        color="gray.700"
                        fontSize={"lg"}
                        fontFamily={"body"}
                        fontWeight={600}
                      >
                        {title}
                      </Heading>
                      <Text color="gray.500" fontSize="xs">
                        {description}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
                {formData["$removable"] && (
                  <HStack spacing={4}>
                    <Switch
                      id={idSchema.$id}
                      isChecked={!!formData["$enabled"]}
                      onChange={() => {
                        formContext.toggleModule(
                          idSchema.$id,
                          !formData["$enabled"],
                        );
                      }}
                    />
                    <IconButton
                      size={"sm"}
                      variant="outline"
                      aria-label="open menu"
                      onClick={() => {
                        formContext.deleteModule(idSchema.$id);
                      }}
                      icon={<DeleteIcon width={16} height={16} />}
                    />
                  </HStack>
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel
              p={8}
              cursor={formData["$enabled"] ? "default" : "not-allowed"}
            >
              <Grid
                gap={8}
                opacity={formData["$enabled"] ? 1 : 0.3}
                pointerEvents={formData["$enabled"] ? "auto" : "none"}
              >
                {properties.map((element, index) =>
                  element.hidden ? (
                    element.content
                  ) : (
                    <GridItem key={`${idSchema.$id}-${element.name}-${index}`}>
                      {element.content}
                    </GridItem>
                  ),
                )}
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    );
  } else {
    /**
     *  Default behavior
     */
    return (
      <>
        {(uiSchema["ui:title"] || title) && !hasGroup && (
          <TitleField
            id={`${idSchema.$id}-title`}
            title={title}
            required={required}
          />
        )}
        {description && (
          <DescriptionField
            id={`${idSchema.$id}-description`}
            description={description}
          />
        )}
        <Grid gap={description ? 2 : 6} mb={4} mt={hasGroup ? 6 : 0}>
          {properties.map((element, index) =>
            element.hidden ? (
              element.content
            ) : (
              <GridItem key={`${idSchema.$id}-${element.name}-${index}`}>
                {element.content}
              </GridItem>
            ),
          )}
          {canExpand(schema, uiSchema, formData) && (
            <GridItem justifySelf="flex-end">
              <AddButton
                className="object-property-expand"
                onClick={onAddClick(schema)}
                disabled={disabled || readonly}
              />
            </GridItem>
          )}
        </Grid>
      </>
    );
  }
};

export default ObjectFieldTemplate;
