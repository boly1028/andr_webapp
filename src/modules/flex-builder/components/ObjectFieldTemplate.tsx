// Panel container for Flex-Builder: Handles panel name change assosciations

import ClassifierIcon from "@/theme/icons/classifiers";
import { Box, Flex, HStack, IconButton, Text } from "@/theme/ui-elements";
import { Grid, GridItem, Switch } from "@chakra-ui/react";

import { ObjectFieldTemplateProps, utils } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import {
  CheckCircle as CheckCircleIcon,
  Copy as Duplicate,
  Edit3 as Rename,
  Trash2 as DeleteIcon,
} from "lucide-react";

import AddButton from "./AddButton";

const { canExpand } = utils;

interface ObjectFieldTemplateExtendedProps extends ObjectFieldTemplateProps {
  schema: JSONSchema7 & {
    class?: any;
    classifier?: any;
  };
}

const ObjectFieldTemplate = (props: ObjectFieldTemplateExtendedProps) => {
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
  const hasGroup = schema["ui:options"]?.["group"];
  console.log(schema, "SCHEMA");

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
              bg={`${schema?.class || "module"}` + ".100"}
              p={1.5}
            >
              <ClassifierIcon
                schemaClass={schema?.class}
                schemaClassifier={schema?.classifier}
                boxSize={5}
              />
              {/* <Icon as={CheckCircleIcon} boxSize={5} color="white" /> */}
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
