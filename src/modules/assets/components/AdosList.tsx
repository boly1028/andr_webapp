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

import { MoreHorizontalIcon } from "@/theme/icons";
import * as classifierIconList from "@/theme/icons/classifiers"; //Load classifier icon list for dynamic assignamnets (redeclared as classifierIcons:any later)

interface InlineStatProps {
  label: string;
  value: string;
  reverse?: boolean;
}

// Format declared modifiers for better UX in application
function formatActionTitles(actionTitleText: string) {
  //let ActionTitleText = actionTitleText;

  // Replace underscores and dashes from modifier labels
  while (actionTitleText.includes("_") || actionTitleText.includes("-")) {
    actionTitleText = actionTitleText.replace("_", " ");
    actionTitleText = actionTitleText.replace("-", " ");
  }

  // Apply title casing to labels
  const actionTitles = actionTitleText
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  actionTitleText = actionTitles.join(" ");

  //Return formatted text
  return actionTitleText;
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
  const {
    name,
    type,
    version,
    lastActivity,
    created,
    $class,
    $classifier,
    modifiers,
  } = data;
  // Import ADOP.json from ado_type+version path

  // Converting imported icon object to type any to avoid string based key reference conflicts in dynamic assosciation calls
  const classifierIcons: any = classifierIconList;
  // console.log(Object.keys(classifierIcons));

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
      {/* Applying bg color by defined $class type + .600 */}
      <Box w={8} h={8} bg={`${$class}` + ".600"} borderRadius="lg" mr={6}>
        {/* Swap background color based on defined class */}
        <Flex
          justify="center"
          align="center"
          borderRadius="lg"
          bg={`${$class}` + ".100"}
          p={2}
        >
          {/* Disable auto loading icon for icon variance based on class and classifier
            {newIcon} */}
          {/* Swap Icon color based on defined class */}
          {classifierIcons[`${$classifier}`] ? (
            <Icon
              as={classifierIcons[`${$classifier}`]}
              color={`${$class}` + ".600"}
              boxSize={6}
            />
          ) : (
            <Icon
              as={classifierIcons[`${$class}`]}
              color={`${$class}` + ".600"}
              boxSize={6}
            />
          )}
        </Flex>
      </Box>

      <Box flex={1}>
        <InlineStat label="Name" value={name} />
        {/* <InlineStat label="{type}" value={name} reverse /> */}
      </Box>
      <Box flex={1}>
        <InlineStat label="Type" value={`${type}@${version}`} />
      </Box>
      {/* <Box flex={1}>
        <InlineStat label="Version" value={version} />
      </Box> */}
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
          {modifiers.map((action) => {
            return (
              <NextLink
                key={keyGen()}
                href={`/collections/moonbirds-3`}
                passHref
              >
                <MenuItem>
                  {/* <MenuItem icon={<Icon as={EyeIcon} boxSize={5} />}> */}
                  {formatActionTitles(action)}
                </MenuItem>
              </NextLink>
            );
          })}
        </MenuList>
      </Menu>
      {/* <Menu placement="bottom-end">
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
        </Menu> */}
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
