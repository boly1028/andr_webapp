import React from "react";

import { FieldProps } from "@rjsf/core";

import { Text, Divider } from "@chakra-ui/react";

const TitleField = ({ title /* , id, required */ }: FieldProps) => {
  return (
    <Text mt={3} mb={2}>
      <Text fontWeight={500}>{title}</Text>
      <Divider mt={1} />
    </Text>
  );
};

export default TitleField;
