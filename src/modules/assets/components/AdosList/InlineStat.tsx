import { FC } from "react";
import { Box, Text } from "@/theme/ui-elements";
import { truncate } from "@/modules/common";
import { Tooltip } from "@chakra-ui/react";

interface InlineStatProps {
  label: string;
  value: string;
  reverse?: boolean;
  trucateOffset?: [number, number];
}

const InlineStat: FC<InlineStatProps> = ({ label, value, reverse = false, trucateOffset = [16, 5] }) => {
  const labelComponent = <Text textStyle="main-xs-regular" color='content.medium'>{label}</Text>;
  const valueComponent = (
    <Tooltip label={value} placement="bottom-start" openDelay={800}>
      <Text textStyle="main-sm-medium">
        {truncate(value, trucateOffset)}
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
