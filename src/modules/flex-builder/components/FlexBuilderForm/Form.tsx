import ChakraForm from "@andromedarjsf/chakra-ui";
import { FormProps } from "@andromedarjsf/core";
import React, { FC } from "react";
import defaultTemplates from "./templates";
import validator from "./validator";
import defaultWidgets from "./widgets";

interface IFormProps extends Omit<FormProps<any, any>, "validator"> { }
const Form = (props: IFormProps, ref: any) => {
  const { templates = {}, widgets = {}, ...otherProps } = props;

  return (
    <ChakraForm
      // @ts-ignore
      ref={ref}
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
export default React.forwardRef<any, IFormProps>(Form)
