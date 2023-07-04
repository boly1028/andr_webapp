import { FC } from "react";
import { Box, Text } from "@/theme/ui-elements";

interface InlineStatProps {
  label: string;
  value: string;
  reverse?: boolean;
}

const InlineStat: FC<InlineStatProps> = ({ label, value, reverse = false }) => {
  const labelComponent = <Text color="dark.500" fontWeight='light' textStyle='light' fontSize='xs'>{label}</Text>;
  const valueComponent = (
    <Text color="base.white" fontWeight='medium'>
      {value}
    </Text>
  );

  if (reverse) {
    return (
      <Box fontSize="sm">
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
