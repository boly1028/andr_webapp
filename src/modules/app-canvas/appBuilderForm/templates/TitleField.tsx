import React from "react";

import { getUiOptions, TitleFieldProps } from "@andromedarjsf/utils";

import { Text, HStack, Tooltip } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

const TitleField = ({ title /* , id, required */, schema, uiSchema }: TitleFieldProps) => {
  const uiOptions = getUiOptions(uiSchema);
  const description = uiOptions.description || schema.description;

  return (
    <HStack mb='2' gap='1' justifyContent='center' alignItems='end' textAlign='center'>
      <Text fontWeight={500} fontSize='xs'>{title}</Text>
      {description && (
        <Tooltip label={description} fontSize='xs' size='xs' textColor='dark.500'>
          <InfoIcon boxSize='3' cursor='pointer' color='dark.300' mb='1px !important' _hover={{ color: 'dark.500' }} />
        </Tooltip>
      )}
    </HStack>
  );
};

export default TitleField;
