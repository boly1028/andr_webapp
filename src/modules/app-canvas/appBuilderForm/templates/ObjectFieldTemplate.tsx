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

  const TitleFieldTemplate = getTemplate<"TitleFieldTemplate">(
    "TitleFieldTemplate",
    registry,
    uiOptions,
  );

  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;


  const hasWrapper = formData?.$removable !== undefined;

  // It should be handled using ui:schema util from rjsf?
  const hasGroup = uiOptions.group;


  return (
    <Box>
      {!hasWrapper && (
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
        </>
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
};

export default ObjectFieldTemplate;
