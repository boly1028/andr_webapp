import React from "react";

import { TitleFieldProps } from "@rjsf/full/node_modules/@rjsf/utils";

import { Text, Divider } from "@chakra-ui/react";

const TitleField = ({ title /* , id, required */ }: TitleFieldProps) => {
  return (
    <Text mt={3} mb={2}>
      <Text fontWeight={500}>{title}</Text>
      <Divider mt={1} />
    </Text>
  );
};

export default TitleField;
