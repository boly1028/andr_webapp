import React from "react";

import { TitleFieldProps } from "@andromedarjsf/utils";

import { Text, Divider } from "@chakra-ui/react";

const TitleField = ({ title /* , id, required */ }: TitleFieldProps) => {
  return (
    <Text mb='2' textAlign='center'>
      <Text fontWeight={500} fontSize='xs'>{title}</Text>
    </Text>
  );
};

export default TitleField;
