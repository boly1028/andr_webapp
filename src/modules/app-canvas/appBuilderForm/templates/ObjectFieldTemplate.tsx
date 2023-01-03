// Panel container for Flex-Builder: Handles panel name change assosciations

import { parseJsonFromFile } from "@/lib/json";
import { IAndromedaFormData, IAndromedaSchema } from "@/lib/schema/types";
import { CopyButton, FileCheckIcon } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import ClassifierIcon from "@/theme/icons/classifiers";
import { Box, Flex, HStack, IconButton, Text } from "@/theme/ui-elements";
import { downloadBlob } from "@/utils/file";
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Button,
  Grid,
  GridItem,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
} from "@chakra-ui/react";

import {
  ObjectFieldTemplateProps,
  canExpand,
  getUiOptions,
  getTemplate,
} from "@andromedarjsf/utils";
import {
  Copy as Duplicate,
  Edit3 as Rename,
  MoreVertical,
  Trash2 as DeleteIcon,
} from "lucide-react";
import { useMemo } from "react";
import { useAppBuilder } from "../../canvas/Provider";
import { useFieldTemplate } from "./FieldTemplate";
import { Handle, Position, useReactFlow } from "reactflow";
import { DIRECTION, getPanelTargetHandlePrefix } from "../connections/utils";

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
  const { deleteNode } = useAppBuilder();
  const { name } = formContext

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

  const { fieldRef } = useFieldTemplate();

  const [upHandle, downHandle] = useMemo(() => {
    return [getPanelTargetHandlePrefix(formContext.name, DIRECTION.UP), getPanelTargetHandlePrefix(formContext.name, DIRECTION.DOWN)]
  }, [formContext.name])

  const toggleModule = () => {
    if (formData === undefined) return;
    const newFormData = { ...formData }
    newFormData.$enabled = !newFormData.$enabled
    console.log("here", newFormData, fieldRef.current)
    fieldRef.current?.onChange?.({
      ...newFormData
    })
  }


  const adoType = useMemo(() => {
    const type = schema.$id
      ?.split("-")
      .map((t) => t.toLocaleLowerCase())
      .join("");
    const baseAdo = schema.$path?.split("/")[0];
    return {
      type,
      baseAdo,
    };
  }, [schema]);

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(formData)], {
      type: "text/plain",
    });
    downloadBlob(
      blob,
      `${schema.$id || "panel"
      }-${name}-${new Date().getTime()}.json`,
    );
  };

  const importJson = async (file: File) => {
    const parsed = await parseJsonFromFile(file);
    fieldRef.current?.onChange?.(parsed);
  };

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
          bg: "dark.100",
        }}
        p={4}
        bg="dark.50"
        border="1px solid"
        borderColor="dark.300"
        borderRadius="lg"
        w='30rem'
      >
        <Handle id={upHandle} type='target' position={Position.Top} style={{ backgroundColor: 'yellow', border: '0px' }} />
        <Handle id={downHandle} type='target' position={Position.Bottom} style={{ backgroundColor: 'yellow', border: '0px' }} />
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
                <Text fontSize="xs"
                  color="dark.500"
                  fontWeight="light">
                  @{schema.version ?? 'latest'}
                </Text>
                {!NON_EDITABLE_CLASS.has(schema.class ?? "") && (
                  <>
                    <CopyButton
                      variant="link"
                      fontSize="xs"
                      color="dark.500"
                      fontWeight="light"
                      text={name}
                    >
                      {name}
                    </CopyButton>
                    {/* ENABLE THIS AFTER COPY NODE IS COMPLETE */}
                    {/* <IconButton
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
                    /> */}
                  </>
                )}
              </HStack>
              <Text textStyle="light" color="dark.500">
                {uiOptions.description || description}
              </Text>
            </Box>
          </HStack>
          <HStack spacing={3}>
            {formData["$removable"] && (
              <>
                <Switch
                  id={idSchema.$id}
                  isChecked={!!formData["$enabled"]}
                  colorScheme="primary"
                  onChange={() => {
                    toggleModule();
                  }}
                />
                {/* <IconButton
                  size={"sm"}
                  variant="outline"
                  aria-label="open menu"
                  onClick={() => {
                    duplicatePanel(currentSchemaId);
                  }}
                  icon={<Duplicate width={16} height={16} />}
                /> */}
                <IconButton
                  size={"sm"}
                  variant="outline"
                  aria-label="open menu"
                  onClick={() => {
                    deleteNode(name);
                  }}
                  icon={<DeleteIcon width={16} height={16} />}
                />
              </>
            )}

            {/* Section for Action List */}
            <Menu placement="bottom-end" colorScheme="dark">
              <MenuButton
                as={IconButton}
                icon={<Icon as={MoreVertical} boxSize={5} />}
                variant="outline"
                size="sm"
              />
              <MenuList>
                <MenuItem
                  onClick={downloadJson}
                  icon={<DownloadIcon boxSize={4} />}
                >
                  Download JSON
                </MenuItem>
                <MenuItem
                  as="label"
                  htmlFor={`${name}-json-input`}
                  icon={<FileCheckIcon boxSize={4} />}
                  cursor="pointer"
                >
                  Import JSON
                  <Input
                    onChange={(e) => {
                      const file = e.target.files?.item(0);
                      if (file) {
                        importJson(file);
                      }
                    }}
                    multiple={false}
                    type="file"
                    id={`${name}-json-input`}
                    // Only Allow json file
                    accept=".json"
                    srOnly
                  />
                </MenuItem>
                {schema.class !== "system" && (
                  <MenuItem
                    as="a"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    href={SITE_LINKS.documentation(
                      adoType.baseAdo,
                      adoType.type,
                    )}
                    icon={<ExternalLinkIcon boxSize={4} />}
                  >
                    Documentation
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
        {formData["$enabled"] && (
          <Box py='4' cursor={formData["$enabled"] ? "default" : "not-allowed"}>
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
        <Grid gap={1} mb={2} mt={hasGroup ? 2 : 0}>
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
