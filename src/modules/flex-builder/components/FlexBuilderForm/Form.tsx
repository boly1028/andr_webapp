import ChakraForm from "@rjsf/chakra-ui";
import { FormProps } from "@rjsf/core";
import React, { FC } from "react";
import defaultTemplates from "./templates";
import validator from "./validator";
import defaultWidgets from "./widgets";

interface IFormProps extends Omit<FormProps<any, any>, "validator"> {}
const Form: FC<IFormProps> = (props) => {
  const { templates = {}, widgets = {}, ...otherProps } = props;
  return (
    <ChakraForm
      validator={validator}
      templates={{
        ...defaultTemplates,
        ...templates,
      }}
      widgets={{ ...defaultWidgets, ...widgets }}
      {...otherProps}
      noHtml5Validate
    />
  );
};
export default Form;
