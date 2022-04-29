import React, { FC } from "react";
import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  Flex,
} from "@chakra-ui/react";

import { ExternalLink } from "@/modules/common";

interface NftPropertiesItemProps {
  label: string;
  desc: string;
  value: string;
}

const NftPropertiesItem: FC<NftPropertiesItemProps> = ({
  label,
  desc,
  value,
}) => {
  return (
    <Box fontSize="sm">
      <Text color="primary.600" fontWeight={600} mb={1}>
        {label}
      </Text>
      <Flex justify="space-between">
        <Text color="gray.700" fontWeight={700} fontSize="sm">
          {desc}
        </Text>
        <Text color="gray.500">{value}</Text>
      </Flex>
    </Box>
  );
};

const ItemSummary = () => {
  return (
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Details
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack spacing={1} align="none">
            <ExternalLink
              label="terra11zr62cdwl5x5ktg9l7ramjwzfrvnw0mv25t03x"
              href="#"
              color="gray.500"
            />
            <ExternalLink
              label="terra11zr62cdwl5x5ktg9l7ramjwzfrvnw0mv25t03x"
              href="#"
              color="gray.500"
            />
            <ExternalLink
              label="terra11zr62cdwl5x5ktg9l7ramjwzfrvnw0mv25t03x"
              href="#"
              color="gray.500"
            />
          </VStack>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Price History
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Offers
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Box mb={3} pb={3} borderBottom="1px solid" borderColor="gray.200">
            <NftPropertiesItem
              label="Eyes"
              desc="Golden Sides Tinted Sunglasses"
              value="9.3% rarity"
            />
          </Box>
          <Box mb={3} pb={3} borderBottom="1px solid" borderColor="gray.200">
            <NftPropertiesItem
              label="Hair"
              desc="Dark Tails Hair"
              value="9.6% rarity"
            />
          </Box>
          <Box mb={3} pb={3} borderBottom="1px solid" borderColor="gray.200">
            <NftPropertiesItem label="Head" desc="Human" value="95.5% rarity" />
          </Box>
          <Box mb={3} pb={3} borderBottom="1px solid" borderColor="gray.200">
            <NftPropertiesItem
              label="Mouth"
              desc="Geryish Beard Calm"
              value="6% rarity"
            />
          </Box>
          <NftPropertiesItem
            label="Pants"
            desc="Black Pants"
            value="9.6% rarity"
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ItemSummary;
