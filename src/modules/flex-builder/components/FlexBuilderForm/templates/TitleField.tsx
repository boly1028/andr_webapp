import React from "react";

import { TitleFieldProps } from "@andromedarjsf/utils";

import { Text, Divider } from "@chakra-ui/react";

const TitleField = ({ title /* , id, required */ }: TitleFieldProps) => {
  return (
    <Text mt={3} mb={2}>
      <Text textStyle="main-md-semibold" >{title}</Text>
      <Divider mt={1} />
    </Text>
  );
};

export default TitleField;
