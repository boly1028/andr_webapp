import { FC } from "react";
import { Box, Text } from "@/theme/ui-elements";

interface InlineStatProps {
  label: string;
  value: string;
  reverse?: boolean;
}

const InlineStat: FC<InlineStatProps> = ({ label, value, reverse = false }) => {
  const labelComponent = <Text color="content.medium" textStyle="main-xs-regular">{label}</Text>;
  const valueComponent = (
    <Text color='content.high' textStyle="main-sm-medium" mt='1'>
      {value}
    </Text>
  );

  if (reverse) {
    return (
      <Box>
        {valueComponent}
        {labelComponent}
      </Box>
    );
  }

  return (
    <Box fontSize="sm">
      {labelComponent}
      {valueComponent}
    </Box>
  );
};

export default InlineStat;
