// Panel container for Flex-Builder: Handles panel name change assosciations

import { parseJsonFromFile } from "@/lib/json";
import { IAdoType, IAndromedaFormData, IAndromedaSchema } from "@/lib/schema/types";
import { CopyButton, FileCheckIcon } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import usePanelRenameModal from "@/modules/modals/hooks/usePanelRenameModal";
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
import { useFieldTemplate } from "./FieldTemplate";
import { SYSTEM_DOCUMENTATION_LINKS } from "@/lib/schema/documentation";

const NON_EDITABLE_CLASS = new Set<string>(["system"]);

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
  if (uiOptions.widget === 'hidden') return null;

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
    formContext as Record<any, (...args) => any | undefined>;

  const { onChange } = useFieldTemplate();

  const openPanelRenameModal = usePanelRenameModal();

  /**Extract schema Id (from rjsf idSchema) used to refierence in json */
  const currentSchemaId = useMemo(() => {
    let rjsfId = idSchema.$id;
    if (rjsfId.slice(0, 5) === "root_") {
      rjsfId = rjsfId.slice(5);
    }
    return rjsfId;
  }, [idSchema]);

  const adoType = useMemo(() => {
    const type = schema.$id
      ?.split("-")
      .map((t) => t.toLocaleLowerCase())
      .join("");
    let baseAdo = schema.$path?.split("/")[0] as IAdoType;
    if (baseAdo === 'app-contract') baseAdo = 'app';
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
      }-${currentSchemaId}-${new Date().getTime()}.json`,
    );
  };

  const importJson = async (file: File) => {
    const parsed = await parseJsonFromFile(file);
    onChange(parsed);
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
        bg='background.800'
        rounded="xl"
        pb='4'
        id={currentSchemaId}
      >
        <Flex bg='backgroundState.idle' p={4} roundedTop='xl'>
          <HStack spacing={3} w="full" align="flex-start">
            <Box alignSelf='center'>
              <ClassifierIcon
                adoType={schema.$id}
                schemaClass={schema?.class as any}
                schemaClassifier={schema?.classifier as any}
                boxSize={4}
              />
            </Box>
            <Box>
              <HStack mb='0.5'>
                <Text textStyle='main-md-semibold'>
                  {uiOptions.title || title}
                </Text>
                <Text textStyle='main-sm-regular' color='content.low'>
                  @{schema.version ?? 'latest'}
                </Text>
                {!NON_EDITABLE_CLASS.has(schema.class ?? "") && (
                  <>
                    <CopyButton
                      variant='unstyled'
                      fontSize='sm'
                      fontWeight='light'
                      size='xs'
                      text={currentSchemaId}
                    >
                      {currentSchemaId}
                    </CopyButton>
                    {changePanelName && (
                      <IconButton
                        size='sm'
                        variant='theme-outline'
                        aria-label="open rename modal"
                        onClick={() => {
                          openPanelRenameModal({
                            callback: (newName) => {
                              changePanelName(newName, currentSchemaId);
                            },
                            defaultName: currentSchemaId,
                            reservedNames: Object.keys(
                              rootSchema?.properties ?? {},
                            ),
                            title: "Rename ADO",
                            body: "Change the assigned name of this component",
                          });
                        }}
                        icon={<Icon as={Rename} />}
                      />
                    )}
                  </>
                )}
              </HStack>
              <Text textStyle="main-sm-regular" color='content.medium'>
                {uiOptions.description || description}
              </Text>
            </Box>
          </HStack>
          <HStack spacing={3}>
            {!formData["$required"] && toggleModule && (
              <Switch
                id={idSchema.$id}
                isChecked={!!formData["$enabled"]}
                onChange={() => {
                  toggleModule(currentSchemaId, !formData["$enabled"]);
                }}
                variant="theme-primary"
              />
            )}
            {formData["$removable"] && duplicatePanel && (
              <IconButton
                size={"sm"}
                variant="theme-low"
                aria-label="duplicate panel"
                onClick={() => {
                  duplicatePanel(currentSchemaId);
                }}
                icon={<Duplicate width={16} height={16} />}
              />
            )}
            {formData['$removable'] && deleteModule && (
              <IconButton
                size={"sm"}
                variant="theme-destructive"
                aria-label="delete module"
                onClick={() => {
                  deleteModule(currentSchemaId);
                }}
                icon={<DeleteIcon width={16} height={16} />}
              />
            )}

            {/* Section for Action List */}
            <Menu placement="bottom-end" colorScheme="dark">
              <MenuButton
                as={IconButton}
                icon={<Icon as={MoreVertical} boxSize={5} />}
                variant="theme-ghost"
                size="sm"
                color='content.low'
              />
              <MenuList textStyle='main-sm-regular'>
                <MenuItem
                  onClick={downloadJson}
                  icon={<DownloadIcon boxSize={4} />}
                >
                  Download JSON
                </MenuItem>
                <MenuItem
                  as="label"
                  htmlFor={`${currentSchemaId}-json-input`}
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
                    id={`${currentSchemaId}-json-input`}
                    // Only Allow json file
                    accept=".json"
                    srOnly
                  />
                </MenuItem>
                <MenuItem
                  as="a"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  href={SYSTEM_DOCUMENTATION_LINKS[schema.$id] ?? SITE_LINKS.documentation(
                    adoType.baseAdo,
                    adoType.type,
                  )}
                  icon={<ExternalLinkIcon boxSize={4} />}
                >
                  Documentation
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
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
