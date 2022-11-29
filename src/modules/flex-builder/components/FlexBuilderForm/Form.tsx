import ChakraForm from "@rjsf/full/node_modules/@rjsf/chakra-ui";
import { FormProps } from "@rjsf/full/node_modules/@rjsf/core";
import React, { FC } from "react";
import defaultTemplates from "./templates";
import validator from "./validator";
import defaultWidgets from "./widgets";

interface IFormProps extends Omit<FormProps<any, any>, "validator"> { }
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
      // Hide Error list at the top as its not intuitive to user
      showErrorList={false}
      {...otherProps}
    />
  );
};
export default Form;
