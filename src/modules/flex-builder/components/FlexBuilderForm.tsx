import React, { FC, useEffect } from "react";
import { Button, HStack, Flex } from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";

import Form from "@rjsf/chakra-ui";

import widgets from "./widgets";
import FieldTemplate from "./FieldTemplate";
import TitleField from "./TitleField";
import ObjectFieldTemplate from "./ObjectFieldTemplate";
import ArrayFieldTemplate from "./ArrayFieldTemplate";

type FlexBuilderFormProps = {
  schema: JSONSchema7;
  uiSchema: any;
  formData?: any;
  onChange?: (data: any) => void;
  onSubmit?: (data: any) => void;
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
      fields={{ TitleField }}
      FieldTemplate={FieldTemplate}
      ArrayFieldTemplate={ArrayFieldTemplate}
      ObjectFieldTemplate={ObjectFieldTemplate}
      widgets={{ ...widgets }}
    >
      <Flex my={16} justify="right">
        <HStack spacing={4}>
          <Button
            variant="outline"
            onClick={() => {
              console.log("estimate Fees");
            }}
          >
            Estimate Fees
          </Button>
          <Button type="submit" colorScheme="purple">
            Publish
          </Button>
        </HStack>
      </Flex>
    </Form>
  );
};

export default FlexBuilderForm;
