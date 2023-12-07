import { IAndromedaFormData, IAndromedaSchema } from "@/lib/schema/types";
import { Box } from "@/theme/ui-elements";
import {
  Grid,
  GridItem,
} from "@chakra-ui/react";

import {
  ObjectFieldTemplateProps,
  canExpand,
  getUiOptions,
  getTemplate,
} from "@andromedarjsf/utils";

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
  if (uiOptions.widget === 'hidden') return null;

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
