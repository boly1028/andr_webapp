import React from "react";

import {
  getTemplate,
  getUiOptions,
  ArrayFieldTemplateProps,
} from "@andromedarjsf/utils";

import { Box, Grid, GridItem, Button } from "@chakra-ui/react";


const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const { schema, registry, uiSchema, idSchema, title, required } = props;

  const uiOptions = getUiOptions(uiSchema);
  const ArrayFieldDescriptionTemplate =
    getTemplate<"ArrayFieldDescriptionTemplate">(
      "ArrayFieldDescriptionTemplate",
      registry,
      uiOptions,
    );
  const ArrayFieldItemTemplate = getTemplate<"ArrayFieldItemTemplate">(
    "ArrayFieldItemTemplate",
    registry,
    uiOptions,
  );
  const ArrayFieldTitleTemplate = getTemplate<"ArrayFieldTitleTemplate">(
    "ArrayFieldTitleTemplate",
    registry,
    uiOptions,
  );

  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;

  return (
    <Box>
      <ArrayFieldTitleTemplate
        idSchema={idSchema}
        title={uiOptions.title || title}
        schema={schema}
        uiSchema={uiSchema}
        required={required}
        registry={registry}
      />
      <ArrayFieldDescriptionTemplate
        idSchema={idSchema}
        description={uiOptions.description || schema.description}
        schema={schema}
        uiSchema={uiSchema}
        registry={registry}
      />

      <Grid key={`array-item-list-${props.idSchema.$id}`}>
        <GridItem>
          {props.items.length > 0 &&
            props.items.map(({ key, ...itemProps }) => (
              <ArrayFieldItemTemplate key={key} {...itemProps} />
            ))}
        </GridItem>
        {props.canAdd && (
          <GridItem justifySelf={"flex-end"}>
            <Box mt={2}>
              <AddButton
                className="array-item-add"
                onClick={props.onAddClick}
                // @ts-ignore
                isDisabled={props.disabled || props.readonly}
                uiSchema={uiSchema}
                // TODO: Fix types in rsjf so we can remove this ts-ignore
                //@ts-ignore
                variant='theme-low'
                //@ts-ignore
                size='sm'
              />
            </Box>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
};

// Used in the two templates

export default ArrayFieldTemplate;
