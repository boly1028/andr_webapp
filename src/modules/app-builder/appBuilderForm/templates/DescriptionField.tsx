import React, { FC } from "react";

import { DescriptionFieldProps } from "@andromedarjsf/utils";

import { Text } from "@chakra-ui/react";

const DescriptionField: FC<DescriptionFieldProps> = ({ description }) => {
  if (typeof description === "string") {
    return (
      <Text mt={1} mb={4}>
        <Text fontSize="sm" fontWeight="light" color="dark.500">
          {description}
        </Text>
      </Text>
    );
  }
  return <>{description}</>;
};

export default DescriptionField;
