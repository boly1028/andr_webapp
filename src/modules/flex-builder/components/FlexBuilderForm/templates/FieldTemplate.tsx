import React, { useEffect, useRef } from "react";

import {
  FieldTemplateProps,
  getTemplate,
  getUiOptions,
  getSchemaType,
} from "@rjsf/utils";

import {
  Text,
  FormControl,
  FormLabel,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";

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
    onChange,
    formData,
    description,
  } = props;

  const uiOptions = getUiOptions(uiSchema);
  const WrapIfAdditionalTemplate = getTemplate<"WrapIfAdditionalTemplate">(
    "WrapIfAdditionalTemplate",
    registry,
    uiOptions,
  );

  useEffect(() => {
    /**
     * A Hack to by pass required field enforcement for array and boolean.
     * These fields are supposed to have default values:
     * array = empty array
     * boolean = false
     * So, if default value is not provided and the field is required,
     * we inject default values ourselves.
     */

    // RJSF Bug so we need to have a timeout to update form data
    const tId = setTimeout(() => {
      if (!required) return;
      if (schema.default) return;
      const type = getSchemaType(schema) as JSONSchema7["type"];
      if (type === "array") {
        if (!Array.isArray(formData)) {
          onChange([], undefined, id);
        }
      } else if (type === "boolean") {
        if (formData === undefined) {
          onChange(false, undefined, id);
        }
      }
    }, 500);

    return () => clearTimeout(tId);
  }, []);

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
      {uiOptions.info && (
        <Alert
          status={uiOptions.infoType as any}
          variant="left-accent"
          rounded="lg"
          fontSize="sm"
        >
          <AlertIcon />
          <AlertDescription
            dangerouslySetInnerHTML={{
              __html: `${uiOptions.info}`,
            }}
          />
        </Alert>
      )}
      <FormControl
        isRequired={required}
        isInvalid={rawErrors && rawErrors.length > 0}
        mt="1"
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
        {displayLabel && <>{description}</>}
        {hasWrapper ? (
          <Box key={1} border="1px" borderColor="dark.300" p="6" rounded="lg">
            {children}
          </Box>
        ) : (
          <>{children}</>
        )}

        {props.help}
        {props.errors}
      </FormControl>
    </WrapIfAdditionalTemplate>
  );
};

export default FieldTemplate;
