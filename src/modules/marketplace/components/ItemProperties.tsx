import React, { FC } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";

interface ItemPropertiesItemProps {
  label: string;
  desc: string;
  value: string;
}

const ItemPropertiesItem: FC<ItemPropertiesItemProps> = ({
  label,
  desc,
  value,
}) => {
  return (
    <Box
      fontSize="sm"
      border="1px solid"
      borderColor="gray.200"
      p={4}
      borderRadius="lg"
    >
      <Text color="primary.600" fontWeight={600} mb={2}>
        {label}
      </Text>
      <Text color="gray.700" fontWeight={700} fontSize="sm" mb={2}>
        {desc}
      </Text>
      <Text color="gray.500">{value}</Text>
    </Box>
  );
};

const ItemProperties = () => {
  return (
    <Box>
      <Text color="gray.700" fontWeight={700} mb={4}>
        Properties
      </Text>
      <SimpleGrid columns={3} spacing={2.5}>
        <ItemPropertiesItem
          label="Eyes"
          desc="Golden Sides Tinted Sunglasses"
          value="9.3% rarity"
        />
        <ItemPropertiesItem
          label="Hair"
          desc="Dark Tails Hair"
          value="9.6% rarity"
        />
        <ItemPropertiesItem label="Type" desc="Human" value="9.5% rarity" />
        <ItemPropertiesItem label="Head" desc="Human" value="95.5% rarity" />
        <ItemPropertiesItem
          label="Mouth"
          desc="Geryish Beard Calm"
          value="6% rarity"
        />
        <ItemPropertiesItem
          label="Pants"
          desc="Black Pants"
          value="9.6% rarity"
        />
        <ItemPropertiesItem
          label="Shoes"
          desc="Black Sole White Shoes"
          value="9.6% rarity"
        />
        <ItemPropertiesItem label="Type" desc="Human" value="9.5% rarity" />
        <ItemPropertiesItem label="Type" desc="Human" value="9.5% rarity" />
      </SimpleGrid>
    </Box>
  );
};

export default ItemProperties;
