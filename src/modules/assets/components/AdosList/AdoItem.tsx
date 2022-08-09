import React, { FC } from "react";
import NextLink from "next/link";
import { AppComponent } from "@/lib/graphql/hooks/useQueryAppInfo";
import * as classifierIconList from "@/theme/icons/classifiers"; //Load classifier icon list for dynamic assignamnets (redeclared as classifierIcons:any later)

import { v4 as keyGen } from "uuid"; // Used as key assignments for function elements

import InlineStat from "./InlineStat";
import { MoreHorizontalIcon } from "@/modules/common";
import { useGetSchemaJson } from "@/lib/schema/hooks";

import {
  Flex,
  Box,
  Icon,
  Menu,
  IconButton,
  MenuButton,
  MenuList,
  MenuItem,
} from "@/theme/ui-elements";

interface AdoItemProps {
  ado: AppComponent;
  appAddress?: string;
}
const AdoItem: FC<AdoItemProps> = ({ ado, appAddress }) => {
  const $version = "0.1.0";
  const { data: adopData, isLoading } = useGetSchemaJson<{
    modifiers: string[];
  }>(`${ado.adoType}/${$version}/ADOP`);

  const classifierIcons: any = classifierIconList;

  return (
    <Flex
      p={5}
      mb={4}
      _last={{ mb: 0 }}
      direction="column"
      rounded="lg"
      _hover={{
        background: "white",
      }}
    >
      <Flex align="center">
        <Box w={8} h={8} borderRadius="lg" mr={6}>
          {/* Swap background color based on defined class */}
          <Flex justify="center" align="center" borderRadius="lg" p={2}>
            {/* Disable auto loading icon for icon variance based on class and classifier
          {newIcon} */}
            {/* Swap Icon color based on defined class */}
            {classifierIcons[`${ado.adoType}`] ? (
              <Icon as={classifierIcons[`${ado.adoType}`]} boxSize={6} />
            ) : (
              <Icon as={classifierIcons[`${ado.adoType}`]} boxSize={6} />
            )}
          </Flex>
        </Box>

        <Box flex={1}>
          <InlineStat label="Name" value={ado.name} />
          {/* <InlineStat label="{type}" value={name} reverse /> */}
        </Box>
        <Box flex={1}>
          <InlineStat label="Type" value={`${ado.adoType}@${$version}`} />
        </Box>
        {/* <Box flex={1}>
      <InlineStat label="Version" value={version} />
    </Box> */}
        {/* <Box flex={1}>
          <InlineStat label="Block Height" value={ado.height?.toString()} />
        </Box> */}
        <Box flex={1}>
          <InlineStat
            label="Address"
            value={ado.address.substr(0, 5) + "..." + ado.address.substr(-5)}
          />
        </Box>
        {/* Section for Action List */}
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            icon={<Icon as={MoreHorizontalIcon} boxSize={6} />}
            variant="link"
          />
          <MenuList>
            {adopData?.modifiers?.map((action) => {
              return (
                <NextLink
                  key={keyGen()}
                  href={`/flexecute/${
                    ado.adoType
                  }/${$version}/${formatActionPath(action)}?name=${
                    ado.name
                  }&contract=${appAddress}`}
                  passHref
                >
                  <MenuItem key={action}>
                    {/* <MenuItem icon={<Icon as={EyeIcon} boxSize={5} />}> */}
                    {formatActionTitles(action)}
                  </MenuItem>
                </NextLink>
              );
            })}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

// Format declared modifiers for better UX in application
function formatActionTitles(actionTitleText: string) {
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

// Format declared modifiers for better UX in application
function formatActionPath(actionPathText: string) {
  // Replace underscores and dashes from modifier labels
  while (actionPathText.includes("_")) {
    actionPathText = actionPathText.replace("_", "-");
  }
  //Return formatted text
  return actionPathText;
}

export default AdoItem;
