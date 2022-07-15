import React, { FC } from "react";
import NextLink from "next/link";

import { ADO_ITEMS, type AdoAsset } from "@/modules/assets";

import { v4 as keyGen } from "uuid"; // Used as key assignments for function elements

import {
  Flex,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  IconButton,
} from "@/theme/ui-elements";

import {
  CheckCircleIcon,
  EditIcon,
  EyeIcon,
  FilePlusIcon,
  MoreHorizontalIcon,
  UnlockIcon,
} from "@/theme/icons";

interface InlineStatProps {
  label: string;
  value: string;
  reverse?: boolean;
}

const InlineStat: FC<InlineStatProps> = ({ label, value, reverse = false }) => {
  const labelComponent = <Text color="gray.500">{label}</Text>;
  const valueComponent = (
    <Text color="gray.700" fontWeight={600}>
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

interface AdosListItemProps {
  data: AdoAsset;
}

const AdosListItem: FC<AdosListItemProps> = ({ data }) => {
  const { name, type, version, lastActivity, created } = data;

  return (
    <Flex
      border="1px solid"
      borderColor="gray.300"
      p={5}
      borderRadius="lg"
      align="center"
      mb={4}
      _last={{ mb: 0 }}
    >
      <Box w={8} h={8} bg="primary.600" borderRadius="lg" mr={6} />

      <Box flex={1}>
        <InlineStat label="Name" value={name} />
        {/* <InlineStat label="{type}" value={name} reverse /> */}
      </Box>
      <Box flex={1}>
        <InlineStat label="Type" value={type} />
      </Box>
      <Box flex={1}>
        <InlineStat label="Version" value={version} />
      </Box>
      <Box flex={1}>
        <InlineStat label="Created" value={created} />
      </Box>
      <Box flex={1}>
        <InlineStat label="Last Updated" value={lastActivity} />
      </Box>

      {/* Section for Action List */}
      <Menu placement="bottom-end">
        <MenuButton
          as={IconButton}
          icon={<Icon as={MoreHorizontalIcon} boxSize={6} />}
          variant="link"
        />
        <MenuList>
          <NextLink href={`/collections/moonbirds-3`} passHref>
            <MenuItem icon={<Icon as={EyeIcon} boxSize={5} />}>View</MenuItem>
          </NextLink>
          <NextLink href={`flex-builder/mint`} passHref>
            <MenuItem icon={<Icon as={FilePlusIcon} boxSize={4} />}>
              Mint
            </MenuItem>
          </NextLink>
          <MenuItem icon={<Icon as={UnlockIcon} boxSize={4} />}>
            Lock/Unlock
          </MenuItem>
          <MenuItem icon={<Icon as={EditIcon} boxSize={4} />}>Edit</MenuItem>
          <MenuItem icon={<Icon as={CheckCircleIcon} boxSize={4} />}>
            Sell
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

const AdosList: FC = () => {
  return (
    <Box>
      {ADO_ITEMS.map((item) => {
        return <AdosListItem key={keyGen()} data={item} />;
      })}
    </Box>
  );
};

export default AdosList;
