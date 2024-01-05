import React, { FC, PropsWithChildren } from "react";
import { Flex, Box, Text } from "@/theme/ui-elements";

interface FallbackPlaceholderProps {
  title: string;
  desc: string;
}

const FallbackPlaceholder: FC<PropsWithChildren<FallbackPlaceholderProps>> = ({
  title,
  desc,
  children,
}) => {
  return (
    <Box maxW="sm">
      <Flex direction="column" alignItems="center" textAlign="center">
        <Text textStyle="main-lg-semibold">{title}</Text>
        <Text textStyle="main-sm-regular" color="content.medium" mt='4'>
          {desc}
        </Text>
        <Box mt="8">{children}</Box>
      </Flex>
    </Box>
  );
};

export default FallbackPlaceholder;
