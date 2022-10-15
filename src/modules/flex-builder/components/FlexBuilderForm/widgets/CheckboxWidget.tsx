import React from "react";
import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Text,
} from "@chakra-ui/react";
import { WidgetProps } from "@rjsf/utils";

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
  } = props;

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
        {label && <FormLabel id={`${id}-label`}>{label}</FormLabel>}
      </Checkbox>
    </FormControl>
  );
};

export default CheckboxWidget;
