import React, { useCallback, useContext, useEffect, useRef } from "react";

import {
  FieldTemplateProps,
  getTemplate,
  getUiOptions,
  getSchemaType,
} from "@andromedarjsf/utils";

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
import { createContext } from "vm";

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
    hideError,
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

  const contextOnChange = useCallback(
    (data: any) => {
      onChange(data, undefined, id);
    },
    [onChange, id],
  );

  if (hidden) {
    return <>{children}</>;
  }

  if (schema.type === "null") {
    return <>{children}</>;
  }

  const hasWrapper = !!schema?.anyOf || !!schema?.oneOf;
  // const hasWrapper = false;

  const showAlert = !hasWrapper && !!uiOptions.alerts;
  const alerts: Array<any> = !showAlert ? [] : uiOptions.alerts as Array<any>

  return (
    <FieldTemplateContext.Provider value={{ onChange: contextOnChange }}>
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
        {alerts.map(alert => (
          <Alert
            status={alert.type}
            variant="left-accent"
            rounded="lg"
            fontSize="sm"
            mb="4"
          >
            <AlertIcon />
            <AlertDescription
              listStylePos="inside"
              dangerouslySetInnerHTML={{
                __html: `${alert.text}`,
              }}
            />
          </Alert>
        ))}
        <FormControl
          isRequired={hasWrapper ? false : required}
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
          {!hideError && props.errors}
        </FormControl>
      </WrapIfAdditionalTemplate>
    </FieldTemplateContext.Provider>
  );
};

interface FieldTemplateContext {
  onChange: (data: any) => void;
}
const defaultValue: FieldTemplateContext = {
  onChange: () => {
    throw new Error("Used outside FieldTemplateContext");
  },
};
const FieldTemplateContext = React.createContext(defaultValue);
export const useFieldTemplate = () => useContext(FieldTemplateContext);

export default FieldTemplate;
