import { JSONSchema7 } from "json-schema";

export type FlexBuilderTemplateProps = {
  id: string;
  name: string;
  icon: string;
  description: string;
  opts: string[];
  schema?: JSONSchema7;
  disabled?: boolean;
};
