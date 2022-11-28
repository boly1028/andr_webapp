import React from "react";
import { Switch } from "@chakra-ui/react";
import { WidgetProps } from "@rjsf/full/node_modules/@rjsf/utils";

export const SwitchWidget = ({
  id,
  autofocus,
  readonly,
  required,
  disabled,
  rawErrors,
  value = "",
  label,
  onFocus,
  onBlur,
  onChange,
}: WidgetProps) => {
  return (
    <Switch
      aria-label={label}
      id={id}
      autoFocus={autofocus}
      isReadOnly={readonly}
      isRequired={required}
      isDisabled={disabled}
      isInvalid={!!rawErrors}
      value={value}
      onFocus={() => {
        onFocus(id, value);
      }}
      onBlur={() => {
        onBlur(id, value);
      }}
      isChecked={value}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
    />
  );
};
