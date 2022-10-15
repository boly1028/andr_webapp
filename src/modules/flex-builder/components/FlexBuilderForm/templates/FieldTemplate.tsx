import React, { useEffect, useRef } from "react";

import { FieldTemplateProps, getTemplate, getUiOptions } from "@rjsf/utils";

import { Text, FormControl, FormLabel, Box, Stack, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

const FieldTemplate = (props: FieldTemplateProps) => {
  const {
    id,
    children,
    classNames,
    disabled,
    displayLabel,
    hidden,
    label,
    onDropPropertyClick,
    onKeyChange,
    readonly,
    required,
    rawErrors = [],
    rawHelp,
    rawDescription,
    schema,
    uiSchema,
    registry,
  } = props;

  const uiOptions = getUiOptions(uiSchema);
  const WrapIfAdditionalTemplate = getTemplate<"WrapIfAdditionalTemplate">(
    "WrapIfAdditionalTemplate",
    registry,
    uiOptions,
  );
  useEffect(() => {
    if (!displayLabel) return;
    if (typeof document === "undefined") return;
    const el = document?.getElementById(`${id}-label`);
    if (el) {
      el.style.display = "none";
    }
  }, [id, schema]);

  if (hidden) {
    return <>{children}</>;
  }

  if (schema.type === "null") {
    return <>{children}</>;
  }

  const hasWrapper = !!schema?.anyOf || !!schema?.oneOf;
  // const hasWrapper = false;

  return (
    <WrapIfAdditionalTemplate
      classNames={classNames}
      disabled={disabled}
      id={id}
      label={label}
      onDropPropertyClick={onDropPropertyClick}
      onKeyChange={onKeyChange}
      readonly={readonly}
      required={required}
      schema={schema}
      uiSchema={uiSchema}
      registry={registry}
    >
      <FormControl
        isRequired={required}
        isInvalid={rawErrors && rawErrors.length > 0}
        mt='1'
      >
        {displayLabel && label ? (
          <FormLabel
            mt={hasWrapper ? "2" : "0"}
            mb="0.5"
            id={`${id}-new-label`}
            htmlFor={id}
          >
            {label}
          </FormLabel>
        ) : null}
        {displayLabel && rawDescription ? (
          <Text mb="2" fontWeight="light" color="GrayText" fontSize="sm">
            {rawDescription}
          </Text>
        ) : null}
        {hasWrapper ? (
          <Box key={1} border="1px" borderColor="gray.300" p="6" rounded="lg">
            {children}
          </Box>
        ) : (
          <>{children}</>
        )}

        {props.help}
        {props.errors}

        {/* We have our own $help field in schema. This is generally done using ui:help but as we are
        changing schema, it will be best to handle all changes in schema only */}
        {/* @ts-ignore */}
        {/* {schema.$help && (
          <FormHelperText id={id}>
            {
              // @ts-ignore
              schema.$help
            }
          </FormHelperText>
        )} */}
      </FormControl>
    </WrapIfAdditionalTemplate>
  );
};

export default FieldTemplate;
