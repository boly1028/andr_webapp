import React, { FC } from "react";
import { Flex, Box, Text } from "@/theme/ui-elements";

interface FallbackPlaceholderProps {
  title: string;
  desc: string;
}

const FallbackPlaceholder: FC<FallbackPlaceholderProps> = ({
  title,
  desc,
  children,
}) => {
  return (
    <Box maxW="sm">
      <Flex direction="column" alignItems="center" textAlign="center">
        <Text textStyle="h1">{title}</Text>
        <Text fontSize="sm" color="dark.500">
          {desc}
        </Text>
        <Box mt="8">{children}</Box>
      </Flex>
    </Box>
  );
};

export default FallbackPlaceholder;
