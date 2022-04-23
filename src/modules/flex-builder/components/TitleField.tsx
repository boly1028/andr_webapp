import React from "react";

import { FieldProps } from "@rjsf/core";

import { Text, Divider, Heading } from "@chakra-ui/react";

const TitleField = ({ title /* , id, required */ }: FieldProps) => (
  <Text mt={0} mb={4}>
    <Text fontWeight={500}>{title}</Text>
    <Divider mt={4} />
  </Text>
);

export default TitleField;
