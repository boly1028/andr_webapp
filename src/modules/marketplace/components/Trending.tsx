import React, { FC } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Button,
  HStack,
  Input,
  Menu,
  MenuButton,
  InputGroup,
  MenuList,
  MenuItem,
  InputLeftElement,
} from "@chakra-ui/react";

import {
  BoxIcon,
  CustomMenuButton,
  ClockIcon,
  ChevronDownIcon,
  SearchIcon,
  LayoutGridIcon,
  DollarSignIcon,
  SortDescIcon,
} from "@/modules/common";
import { NftItem, NFT_TRENDING } from "@/modules/marketplace";

const Trending: FC = () => {
  return (
    <Box>
      <Text textStyle="h1" mt={16} mb={7}>
        Trending
      </Text>

      <HStack mb={8} spacing={4}>
        <InputGroup flex={1}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input placeholder="Collection, item or user" />
        </InputGroup>
        <Menu placement="bottom-end">
          <CustomMenuButton leftIcon={<BoxIcon boxSize={5} color="gray.500" />}>
            Blockchain
          </CustomMenuButton>
          <MenuList>
            <MenuItem icon={<ClockIcon boxSize={5} />}>Blockchain</MenuItem>
          </MenuList>
        </Menu>
        <Menu placement="bottom-end">
          <CustomMenuButton
            leftIcon={<LayoutGridIcon boxSize={5} color="gray.500" />}
          >
            Category
          </CustomMenuButton>
          <MenuList>
            <MenuItem icon={<ClockIcon boxSize={5} />}>Blockchain</MenuItem>
          </MenuList>
        </Menu>
        <Menu placement="bottom-end">
          <CustomMenuButton
            leftIcon={<DollarSignIcon boxSize={5} color="gray.500" />}
          >
            Price range
          </CustomMenuButton>
          <MenuList>
            <MenuItem icon={<ClockIcon boxSize={5} />}>Blockchain</MenuItem>
          </MenuList>
        </Menu>
        <Menu placement="bottom-end">
          <CustomMenuButton
            leftIcon={<SortDescIcon boxSize={5} color="gray.500" />}
          >
            Recently added
          </CustomMenuButton>
          <MenuList>
            <MenuItem icon={<ClockIcon boxSize={5} />}>Blockchain</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <SimpleGrid columns={4} spacing={4}>
        {NFT_TRENDING.map((data) => {
          return <NftItem key={data.id} data={data} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Trending;
