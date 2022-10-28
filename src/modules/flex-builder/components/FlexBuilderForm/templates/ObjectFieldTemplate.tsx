// Panel container for Flex-Builder: Handles panel name change assosciations

import { IAndromedaFormData, IAndromedaSchema } from "@/lib/schema/types";
import { CopyButton } from "@/modules/common";
import usePanelRenameModal from "@/modules/modals/hooks/usePanelRenameModal";
import ClassifierIcon from "@/theme/icons/classifiers";
import { Box, Flex, HStack, IconButton, Text } from "@/theme/ui-elements";
import { Grid, GridItem, Switch } from "@chakra-ui/react";

import {
  ObjectFieldTemplateProps,
  canExpand,
  getUiOptions,
  getTemplate,
} from "@rjsf/utils";
import {
  Copy as Duplicate,
  Edit3 as Rename,
  Trash2 as DeleteIcon,
} from "lucide-react";
import { useMemo } from "react";

const NON_EDITABLE_CLASS = new Set<string>(["system", "modifier"]);

interface ObjectFieldTemplateExtendedProps extends ObjectFieldTemplateProps {
  schema: IAndromedaSchema;
  formData: IAndromedaFormData | undefined;
}

const ObjectFieldTemplate = (props: ObjectFieldTemplateExtendedProps) => {
  const {
    registry,
    description,
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
    formContext, //used as prop drilling form action calls: toogleModule() / deleteModule() / renameModule(),
  } = props;
  const uiOptions = getUiOptions(uiSchema);
  const rootSchema = registry.rootSchema;

  const TitleFieldTemplate = getTemplate<"TitleFieldTemplate">(
    "TitleFieldTemplate",
    registry,
    uiOptions,
  );
  const DescriptionFieldTemplate = getTemplate<"DescriptionFieldTemplate">(
    "DescriptionFieldTemplate",
    registry,
    uiOptions,
  );

  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;

  const { toggleModule, deleteModule, changePanelName, duplicatePanel } =
    formContext as Record<any, (...args)=>any | undefined>;

  const openPanelRenameModal = usePanelRenameModal();

  /**Extract schema Id (from rjsf idSchema) used to refierence in json */
  const currentSchemaId = useMemo(() => {
    let rjsfId = idSchema.$id;
    if (rjsfId.slice(0, 5) === "root_") {
      rjsfId = rjsfId.slice(5);
    }
    return rjsfId;
  }, [idSchema]);

  const hasWrapper = formData?.$removable !== undefined;

  // It should be handled using ui:schema util from rjsf?
  const hasGroup = uiOptions.group;

  if (hasWrapper) {
    return (
      /**
       *  Add wrapper
       */
      // < allowToggle defaultIndex={defaultIndex}>
      <Box
        _hover={{
          bg: "dark.50",
        }}
        p={4}
        border="1px solid"
        borderColor="dark.300"
        borderRadius="lg"
      >
        <Flex>
          <HStack spacing={5} w="full" align="flex-start">
            <ClassifierIcon
              adoType={schema.$id}
              schemaClass={schema?.class as any}
              schemaClassifier={schema?.classifier as any}
              boxSize={5}
            />
            <Box>
              <HStack mb={1}>
                <Text fontSize="sm" color="base.white" fontWeight={600}>
                  {uiOptions.title || title}
                </Text>
                {!NON_EDITABLE_CLASS.has(schema.class ?? "") && (
                  <>
                    <CopyButton
                      variant="link"
                      fontSize="xs"
                      color="dark.500"
                      fontWeight="light"
                      text={currentSchemaId}
                    >
                      {currentSchemaId}
                    </CopyButton>
                    <Text></Text>
                    {changePanelName && (
                      <IconButton
                        size={"sm"}
                        variant="outline"
                        aria-label="open menu"
                        onClick={() => {
                          openPanelRenameModal({
                            callback: (newName) => {
                              changePanelName(newName, currentSchemaId);
                            },
                            defaultName: currentSchemaId,
                            reservedNames: Object.keys(
                              rootSchema?.definitions ?? {},
                            ),
                            title: "Rename ADO",
                            body: "Change the assigned name of this component",
                          });
                        }}
                        icon={<Rename width={16} height={16} />}
                      />
                    )}
                  </>
                )}
              </HStack>
              <Text textStyle="light" color="dark.500">
                {uiOptions.description || description}
              </Text>
            </Box>
          </HStack>
          {formData["$removable"] && toggleModule && (
            <HStack spacing={4}>
              <Switch
                id={idSchema.$id}
                isChecked={!!formData["$enabled"]}
                colorScheme="primary"
                onChange={() => {
                  toggleModule(currentSchemaId, !formData["$enabled"]);
                }}
              />
              {duplicatePanel && (
                <IconButton
                  size={"sm"}
                  variant="outline"
                  aria-label="open menu"
                  onClick={() => {
                    duplicatePanel(currentSchemaId);
                  }}
                  icon={<Duplicate width={16} height={16} />}
                />
              )}
              {deleteModule && (
                <IconButton
                  size={"sm"}
                  variant="outline"
                  aria-label="open menu"
                  onClick={() => {
                    deleteModule(currentSchemaId);
                  }}
                  icon={<DeleteIcon width={16} height={16} />}
                />
              )}
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
        {(uiOptions.title || title) && !hasGroup && (
          <TitleFieldTemplate
            id={`${idSchema.$id}-title`}
            title={uiOptions.title || title}
            required={required}
            schema={schema}
            uiSchema={uiSchema}
            registry={registry}
          />
        )}
        {description && (
          <DescriptionFieldTemplate
            id={`${idSchema.$id}-description`}
            description={description}
            schema={schema}
            registry={registry}
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
                uiSchema={uiSchema}
              />
            </GridItem>
          )}
        </Grid>
      </>
    );
  }
};

export default ObjectFieldTemplate;
