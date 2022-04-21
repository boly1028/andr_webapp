import { JSONSchema7 } from "json-schema";

export type FlexBuilderTemplateProps = {
  id: string;
  name: string;
  icon: string;
  description: string;
  opts: string[];
  ados: FlexBuilderTemplateADOProps[];
  schema?: JSONSchema7;
  uiSchema?: any;
  formData?: any;
  disabled?: boolean;
};

export type FlexBuilderTemplateADOProps = {
  id: string;
  path: string;
  required?: boolean;
  enabled?: boolean;
};
