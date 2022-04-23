import React, { FC, useEffect } from "react";
import { Button, HStack, Flex } from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";

import Form from "@rjsf/chakra-ui";

import ObjectFieldTemplate from "./ObjectFieldTemplate";
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
