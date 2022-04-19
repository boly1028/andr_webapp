import React, { FC } from "react";
import { Box, Text, Heading } from "@chakra-ui/react";

interface PageHeaderProps {
  title: string;
  desc: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, desc }) => {
  return (
    <Box>
      <Heading fontWeight="600" fontSize="xl" my={2}>
        {title}
      </Heading>
      <Text fontSize="sm" color="gray.500">
        {desc}
      </Text>
    </Box>
  );
};

export default PageHeader;
