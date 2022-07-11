// Panel container for Flex-Builder: Handles panel name change assosciations
// changePanelName()
import React from "react";

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Switch,
  Icon,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import { IdSchema, ObjectFieldTemplateProps } from "@rjsf/core";
import { utils } from "@rjsf/core";
import {
  CheckCircle as CheckCircleIcon,
  Trash2 as DeleteIcon,
  Edit3 as Rename,
  Copy as Duplicate,
} from "lucide-react";

import AddButton from "./AddButton";

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
    formContext, //used as prop drilling form action calls: toogleModule() / deleteModule() / renameModule()
  } = props;

  const hasWrapper = formData["$removable"] !== undefined;
  // @ts-expect-error - TODO
  const hasGroup = schema["ui:options"]?.["group"];

  if (hasWrapper) {
    return (
      /**
       *  Add wrapper
       */
      // < allowToggle defaultIndex={defaultIndex}>
      <Box p={4} border="1px solid" borderColor="gray.300" borderRadius="lg">
        <Flex>
          <HStack spacing={5} w="full" align="flex-start">
            <Flex
              justify="center"
              align="center"
              borderRadius="lg"
              bg="module.500"
              p={1.5}
            >
              <Icon as={CheckCircleIcon} boxSize={5} color="white" />
            </Flex>
            <Box>
              <Text fontSize="sm" color="gray.700" fontWeight={600} mb={1}>
                {title}
              </Text>
              <Text textStyle="light">{description}</Text>
            </Box>
          </HStack>
          {formData["$removable"] && (
            <HStack spacing={4}>
              <Switch
                id={idSchema.$id}
                isChecked={!!formData["$enabled"]}
                colorScheme="primary"
                onChange={() => {
                  formContext.toggleModule(idSchema.$id, !formData["$enabled"]);
                }}
              />
              <IconButton
                size={"sm"}
                variant="outline"
                aria-label="open menu"
                onClick={() => {
                  formContext.changePanelName(idSchema.$id);
                }}
                icon={<Rename width={16} height={16} />}
              />
              <IconButton
                size={"sm"}
                variant="outline"
                aria-label="open menu"
                onClick={() => {
                  formContext.duplicatePanel(idSchema.$id);
                }}
                icon={<Duplicate width={16} height={16} />}
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
        </Flex>
        {formData["$enabled"] && (
          <Box p={8} cursor={formData["$enabled"] ? "default" : "not-allowed"}>
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
          </Box>
        )}
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
        <Grid gap={description ? 2 : 4} mb={4} mt={hasGroup ? 6 : 0}>
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
