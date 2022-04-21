import React from "react";

import {
  Box,
  Grid,
  GridItem,
  Switch,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  IconButton,
} from "@chakra-ui/react";

import { ObjectFieldTemplateProps } from "@rjsf/core";
import { utils } from "@rjsf/core";

import { Trash2 as DeleteIcon } from "lucide-react";

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
  } = props;

  const hasWrapper = formData["$removable"] !== undefined;
  console.log("hasWrapper", hasWrapper, title);

  if (hasWrapper) {
    const defaultIndex = formData["$removable"] ? -1 : 0;
    return (
      /**
       *  Add wrapper
       */
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Accordion allowToggle defaultIndex={defaultIndex}>
          <AccordionItem borderTop={0} borderBottom={0}>
            <h2>
              <AccordionButton bg="gray.50">
                <Box flex="1" textAlign="left">
                  {title}
                </Box>
                {formData["$removable"] && (
                  <>
                    <Switch id={idSchema.$id} />
                    <IconButton
                      variant="outline"
                      aria-label="open menu"
                      icon={<DeleteIcon />}
                    />
                  </>
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Grid gap={description ? 2 : 6} mb={4}>
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
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    );
  } else {
    /**
     *  Default behavior
     */
    return (
      <>
        {(uiSchema["ui:title"] || title) && (
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
        <Grid gap={description ? 2 : 6} mb={4}>
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
