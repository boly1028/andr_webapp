import React from "react";
import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getUiOptions, WidgetProps } from "@rjsf/utils";

const CheckboxWidget = (props: WidgetProps) => {
  const {
    id,
    value,
    disabled,
    readonly,
    onChange,
    onBlur,
    onFocus,
    label,
    rawErrors,
    schema,
    uiSchema,
  } = props;
  const uiOptions = getUiOptions(uiSchema);

  const _onChange = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => onChange(checked);
  const _onBlur = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement | any>) => onBlur(id, value);
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement | any>) => onFocus(id, value);

  return (
    <FormControl>
      <Checkbox
        id={id}
        name={id}
        isChecked={typeof value === "undefined" ? false : value}
        isDisabled={disabled || readonly}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
      >
        <VStack alignItems='start' spacing='0' ml='2'>
          {(uiOptions.title || schema.title || label) && (
            <Text id={`${id}-label`}>
              {uiOptions.title ?? schema.title ?? label}
            </Text>
          )}
          {(uiOptions.description || schema.description) && (
            <Text fontSize='xs' textStyle='light' id={`${id}-label-description`}>
              {uiOptions.description ?? schema.description}
            </Text>
          )}
        </VStack>
      </Checkbox>
    </FormControl>
  );
};

export default CheckboxWidget;
