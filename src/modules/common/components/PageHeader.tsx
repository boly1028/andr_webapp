import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

interface PageHeaderProps {
  title: string;
  desc: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, desc }) => {
  return (
    <Box>
      <Text textStyle="h1">{title}</Text>
      <Text fontSize="sm" color="gray.500">
        {desc}
      </Text>
    </Box>
  );
};

export default PageHeader;
