import React from "react";

import {
  getTemplate,
  getUiOptions,
  ArrayFieldTemplateProps,
} from "@andromedarjsf/utils";

import { Box, Grid, GridItem, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";


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
    <Box my='1'
      py='2'
      bg="#ffffff04"

    >
      <ArrayFieldTitleTemplate
        idSchema={idSchema}
        title={uiOptions.title || title}
        schema={schema}
        uiSchema={uiSchema}
        required={required}
        registry={registry}
      />
      {/* <ArrayFieldDescriptionTemplate
        idSchema={idSchema}
        description={uiOptions.description || schema.description}
        schema={schema}
        uiSchema={uiSchema}
        registry={registry}
      /> */}

      <Grid key={`array-item-list-${props.idSchema.$id}`}>
        <GridItem>
          {props.items.length > 0 &&
            props.items.map(({ key, ...itemProps }) => (
              <ArrayFieldItemTemplate key={key} {...itemProps} />
            ))}
        </GridItem>
        {props.canAdd && (
          <GridItem w='full' mt='1'>
            <Button
              className="array-item-add"
              onClick={props.onAddClick}
              disabled={props.disabled || props.readonly}
              variant='ghost'
              size='xs'
              w='full'
              leftIcon={(<AddIcon boxSize='2' />)}
            >
              Add Item
            </Button>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
};

// Used in the two templates

export default ArrayFieldTemplate;
