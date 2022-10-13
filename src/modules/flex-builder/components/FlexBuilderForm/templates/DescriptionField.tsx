import React from "react";

import { FieldProps } from "@rjsf/core";

import { Text, Divider } from "@chakra-ui/react";

const DescriptionField = ({ description }: FieldProps) => {
  return (
    <Text mt={1} mb={4}>
      <Text fontSize="sm" fontWeight="light" color="GrayText">
        {description}
      </Text>
    </Text>
  );
};

export default DescriptionField;
