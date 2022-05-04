import React, { FC } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { BoxIcon, ClockIcon, ChevronDownIcon } from "@/modules/common";
import { CollectionListItem, COLLECTIONS } from "@/modules/marketplace";

const TopCollections: FC = () => {
  return (
    <Box>
      <Text textStyle="h1" mt={16} mb={7}>
        Top Collections
      </Text>

      <HStack mb={8} spacing={4}>
        <Menu placement="bottom-end">
          <MenuButton
            as={Button}
            leftIcon={<ClockIcon />}
            rightIcon={<ChevronDownIcon />}
            variant="outline"
          >
            7 days
          </MenuButton>
          <MenuList>
            <MenuItem icon={<ClockIcon boxSize={5} />}>7 days</MenuItem>
          </MenuList>
        </Menu>
        <Menu placement="bottom-end">
          <MenuButton
            as={Button}
            leftIcon={<BoxIcon />}
            rightIcon={<ChevronDownIcon />}
            variant="outline"
          >
            Blockchain
          </MenuButton>
          <MenuList>
            <MenuItem icon={<ClockIcon boxSize={5} />}>Blockchain</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <SimpleGrid columns={5} spacing={4}>
        {COLLECTIONS.map((data) => {
          return <CollectionListItem key={data.id} data={data} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default TopCollections;
