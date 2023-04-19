import React, { ChangeEvent, FocusEvent, useCallback } from "react";
import { Select as ChakraSelect, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { getUiOptions, processSelectValue, WidgetProps } from "@andromedarjsf/utils";

const SelectWidget = (props: WidgetProps) => {
  const {
    schema,
    id,
    options,
    label,
    placeholder,
    required,
    disabled,
    readonly,
    value,
    multiple = false,
    autofocus = false,
    onChange,
    onBlur,
    onFocus,
    rawErrors = [],
    uiSchema,
  } = props;
  const uiOptions = getUiOptions(uiSchema)
  const { enumOptions, enumDisabled } = options;

  const emptyValue = multiple ? [] : "";

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLSelectElement>) => {
      const newValue = getValue(event, multiple);
      return onFocus(id, processSelectValue(schema, newValue, options));
    },
    [onFocus, id, schema, multiple, options]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLSelectElement>) => {
      const newValue = getValue(event, multiple);
      return onBlur(id, processSelectValue(schema, newValue, options));
    },
    [onBlur, id, schema, multiple, options]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const newValue = getValue(event, multiple);
      return onChange(processSelectValue(schema, newValue, options));
    },
    [onChange, schema, multiple, options]
  );

  return (
    <FormControl
      isDisabled={disabled || readonly}
      isRequired={required}
      isReadOnly={readonly}
      isInvalid={rawErrors && rawErrors.length > 0}
      px='4'
      mb='2'
    >
      {(label || uiOptions.title || schema.title) && (
        <FormLabel htmlFor={multiple ? undefined : id} fontSize='xs'>
          {label || uiOptions.title || schema.title}
        </FormLabel>
      )}
      <ChakraSelect
        id={id}
        name={id}
        multiple={multiple}
        className="form-control"
        value={typeof value === "undefined" ? emptyValue : value}
        required={required}
        disabled={disabled || readonly}
        autoFocus={autofocus}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        size='sm'
        fontSize='xs'
      >
        {!multiple && schema.default === undefined && (
          <Text as='option' fontSize='md' value="">{placeholder}</Text>
        )}
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, i) => {
            const { value, label } = option;
            const disabled = enumDisabled && enumDisabled.indexOf(value) != -1;
            return (
              <Text as='option' fontSize='md' key={i} value={value} disabled={disabled}>
                {label}
              </Text>
            );
          })}
      </ChakraSelect>
    </FormControl>
  );
};

function getValue(
  event: React.SyntheticEvent<HTMLSelectElement>,
  multiple: boolean
) {
  if (multiple) {
    return Array.from((event.target as HTMLSelectElement).options)
      .slice()
      .filter((o) => o.selected)
      .map((o) => o.value);
  }
  return (event.target as HTMLSelectElement).value;
}

export default SelectWidget;
