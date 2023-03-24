// Panel container for Flex-Builder: Handles panel name change assosciations

import { parseJsonFromFile } from "@/lib/json";
import { IAdoType, IAndromedaFormData, IAndromedaSchema } from "@/lib/schema/types";
import { CopyButton, FileCheckIcon } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import ClassifierIcon, { useGetClassColor } from "@/theme/icons/classifiers";
import { Box, Flex, HStack, IconButton, Text } from "@/theme/ui-elements";
import { downloadBlob } from "@/utils/file";
import { DownloadIcon, EditIcon, ExternalLinkIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Grid,
  GridItem,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";

import {
  ObjectFieldTemplateProps,
  canExpand,
  getUiOptions,
  getTemplate,
} from "@andromedarjsf/utils";
import {
  MoreVertical,
  Trash2 as DeleteIcon,
} from "lucide-react";
import { useMemo } from "react";
import { useAppBuilder } from "../../canvas/Provider";
import { useFieldTemplate } from "./FieldTemplate";
import { Position } from "reactflow";
import { DIRECTION, getPanelTargetHandlePrefix } from "../connections/utils";
import usePanelRenameModal from "@/modules/modals/hooks/usePanelRenameModal";
import Handle from "../ReactFlow/Handle";

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
  const { deleteNode, renameNode, nodes } = useAppBuilder();
  const { name } = formContext

  const TitleFieldTemplate = getTemplate<"TitleFieldTemplate">(
    "TitleFieldTemplate",
    registry,
    uiOptions,
  );

  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;

  const { fieldRef } = useFieldTemplate();
  const openPanelRenameModal = usePanelRenameModal();

  const [upHandle, downHandle] = useMemo(() => {
    return [getPanelTargetHandlePrefix(formContext.name, DIRECTION.UP), getPanelTargetHandlePrefix(formContext.name, DIRECTION.DOWN)]
  }, [formContext.name])

  // const toggleModule = () => {
  //   if (formData === undefined) return;
  //   const newFormData = { ...formData }
  //   newFormData.$enabled = !newFormData.$enabled
  //   console.log("here", newFormData, fieldRef.current)
  //   fieldRef.current?.onChange?.({
  //     ...newFormData
  //   })
  // }


  const adoType = useMemo(() => {
    const type = schema.$id
      ?.split("-")
      .map((t) => t.toLocaleLowerCase())
      .join("");
    const baseAdo = schema.$path?.split("/")[0] as IAdoType;
    return {
      type,
      baseAdo,
    };
  }, [schema]);

  const adoBorderColor = useGetClassColor({ adoType: adoType.baseAdo }, 'default')

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
        bg="newSystem.background.900"
        borderRadius="lg"
      >
        <Box
          _hover={{
            bg: '#ffffff04',
          }}
          py={4}
          border="1px solid"
          borderColor={adoBorderColor}
          borderRadius="lg"
          w='30rem'
          bg="newSystem.background.800"
        >
          <Handle id={upHandle} type='target' position={Position.Top} adoType={adoType.baseAdo} />
          <Handle id={downHandle} type='target' position={Position.Bottom} adoType={adoType.baseAdo} />
          <Flex px='4'>
            <HStack spacing={5} w="full">
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
                  {(uiOptions.description || description) && (
                    <Tooltip label={uiOptions.description || description} fontSize='xs' size='xs' textColor='dark.500'>
                      <InfoIcon boxSize='4' cursor='pointer' color='dark.300' _hover={{ color: 'dark.500' }} />
                    </Tooltip>
                  )}

                  {!NON_EDITABLE_CLASS.has(schema.class ?? "") && (
                    <>
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
                {/* <Text textStyle="light" color="dark.500"> */}
                {/* {uiOptions.description || description} */}
                {/* </Text> */}
              </Box>
            </HStack>
            <HStack spacing={2}>
              <CopyButton
                variant="solid"
                size='sm'
                fontSize="xs"
                colorScheme='blackAlpha'
                text={name}
                rightIcon={(
                  <IconButton size='sm' variant='ghost' aria-label="edit-name" icon={<EditIcon boxSize='4' />}
                    onClick={(e) => {
                      e.stopPropagation()
                      openPanelRenameModal({
                        callback: (newName) => {
                          renameNode(name, newName);
                        },
                        defaultName: name,
                        reservedNames: nodes.map(node => node.id),
                        title: "Rename ADO",
                        body: "Change the assigned name of this component",
                      });
                    }}
                  />
                )}
                pr='0'
              >
                {name}
              </CopyButton>

              <IconButton
                aria-label="delete-button"
                onClick={() => deleteNode(name)}
                icon={<Icon as={DeleteIcon} boxSize={5} />}
                variant='ghost'
                size='sm'
                color='red.200'
              />

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
      </Box>
    );
  } else {
    /**
     *  Default behavior
     */
    return (
      <Box>
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
        <Grid>
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
      </Box>
    );
  }
};

export default ObjectFieldTemplate;
