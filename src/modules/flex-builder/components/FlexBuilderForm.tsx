import React, { FC, useEffect, useState } from "react";

import { JSONSchema7 } from "json-schema";

import Form from "@rjsf/chakra-ui";

import widgets from "./widgets";

type FlexBuilderFormProps = {
  schema: JSONSchema7;
  uiSchema: any;
  formData?: any;
  onChange?: (val: any) => void;
  onSubmit?: () => void;
  onError?: () => void;
};

const FlexBuilderForm: FC<FlexBuilderFormProps> = ({
  schema,
  uiSchema,
  formData,
  onChange,
  onSubmit,
  onError,
}) => {
  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onChange={onChange}
      onSubmit={onSubmit}
      onError={onError}
      widgets={{ ...widgets }}
    />
  );
};

export default FlexBuilderForm;
