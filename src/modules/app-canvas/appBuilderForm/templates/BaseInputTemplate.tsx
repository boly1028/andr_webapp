import * as React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { getInputProps, getUiOptions, WidgetProps } from "@andromedarjsf/utils";

const BaseInputTemplate = (props: WidgetProps) => {
  const {
    id,
    type,
    value,
    label,
    schema,
    uiSchema,
    onChange,
    onBlur,
    onFocus,
    options,
    required,
    readonly,
    rawErrors,
    autofocus,
    placeholder,
    disabled,
    registry,
  } = props;
  const inputProps = getInputProps(schema, type, options);
  const { schemaUtils } = registry;
  const uiOptions = getUiOptions(uiSchema);


  const _onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    onChange(value === "" ? options.emptyValue : value);
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(id, value);
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);

  const displayLabel =
    schemaUtils.getDisplayLabel(schema, uiSchema) &&
    (!!label || !!schema.title);

  return (
    <FormControl
      mb={1}
      isDisabled={disabled || readonly}
      isRequired={required}
      isReadOnly={readonly}
      isInvalid={rawErrors && rawErrors.length > 0}
      display='flex'
      flexDirection='row'
      alignItems='center'
      gap='2'
    >
      {displayLabel ? (
        <FormLabel htmlFor={id} id={`${id}-label`} flex='0' m='0'>
          {label || uiOptions.label || schema.label}
        </FormLabel>
      ) : null}
      <Input
        id={id}
        name={id}
        value={value || value === 0 ? value : ""}
        flex='1'
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        autoFocus={autofocus}
        placeholder={placeholder}
        {...inputProps}
        list={schema.examples ? `examples_${id}` : undefined}
        size='sm'
        rounded='md'
      />
      {schema.examples ? (
        <datalist id={`examples_${id}`}>
          {(schema.examples as string[])
            .concat(schema.default ? ([schema.default] as string[]) : [])
            .map((example: any) => {
              return <option key={example} value={example} />;
            })}
        </datalist>
      ) : null}
    </FormControl>
  );
};

export default BaseInputTemplate;
