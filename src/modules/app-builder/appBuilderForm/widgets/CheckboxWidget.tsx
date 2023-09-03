import React from "react";
import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { getUiOptions, WidgetProps } from "@andromedarjsf/utils";
import { InfoIcon } from "@chakra-ui/icons";

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

  const description = uiOptions.description || schema.description;

  return (
    <FormControl px='4' my='2'>
      <Checkbox
        id={id}
        name={id}
        isChecked={typeof value === "undefined" ? false : value}
        isDisabled={disabled || readonly}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        size='md'
      >
        <HStack alignItems='center' spacing='2' ml='1'>
          {(uiOptions.title || schema.title || label) && (
            <Text id={`${id}-label`} fontSize='xs'>
              {uiOptions.title ?? schema.title ?? label}
            </Text>
          )}
          {(description) && (
            <Tooltip label={description}>
              <InfoIcon boxSize='4' cursor='pointer' color='dark.300' _hover={{ color: 'dark.500' }} />
            </Tooltip>
          )}
        </HStack>
      </Checkbox>
    </FormControl>
  );
};

export default CheckboxWidget;
