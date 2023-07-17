import { FC } from "react";
import { Box, Text } from "@/theme/ui-elements";
import { truncate } from "@/modules/common";
import { Tooltip } from "@chakra-ui/react";

interface InlineStatProps {
  label: string;
  value: string;
  reverse?: boolean;
}

const InlineStat: FC<InlineStatProps> = ({ label, value, reverse = false }) => {
  const labelComponent = <Text color="dark.500" fontWeight='light' textStyle='light' fontSize='xs'>{label}</Text>;
  const valueComponent = (
    <Tooltip label={value} placement="bottom-start" openDelay={800}>
      <Text color="base.white" fontWeight='medium'>
        {truncate(value, [16, 5])}
      </Text>
    </Tooltip>
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
