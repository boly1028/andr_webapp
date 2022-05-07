import React, { FC } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

interface PageHeaderProps {
  title: string;
  desc: string;
  rightElement?: React.ReactNode;
}

const PageHeader: FC<PageHeaderProps> = ({ title, desc, rightElement }) => {
  return (
    <Flex justify="space-between">
      <Box>
        <Text textStyle="h1">{title}</Text>
        <Text fontSize="sm" color="gray.500">
          {desc}
        </Text>
      </Box>
      {rightElement}
    </Flex>
  );
};

export default PageHeader;
