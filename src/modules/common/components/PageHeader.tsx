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
      <Box pr='12'>
        <Text textStyle="main-xl-bold">{title}</Text>
        <Text textStyle="main-sm-regular" color='content.medium'>
          {desc}
        </Text>
      </Box>
      {rightElement}
    </Flex>
  );
};

export default PageHeader;
