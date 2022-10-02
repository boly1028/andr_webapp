import React, { FC } from "react";
import NextLink from "next/link";
import { AppComponent } from "@/lib/graphql/hooks/useQueryAppInfo";

import { v4 as keyGen } from "uuid"; // Used as key assignments for function elements

import InlineStat from "./InlineStat";
import { MoreHorizontalIcon } from "@/modules/common";

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
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import ClassifierIcon from "@/theme/icons/classifiers";
import { useGetSchemaADOP } from "@/lib/schema/hooks/useGetSchemaADOP";
import { IAdoType } from "@/lib/schema/types";

interface AdoItemProps {
  ado: AppComponent;
  appAddress?: string;
}
const AdoItem: FC<AdoItemProps> = ({ ado, appAddress }) => {
  const $version = "0.1.0";
  const adoType = ado.adoType as IAdoType;
  const { data: adopData, isLoading } = useGetSchemaADOP(adoType);

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
            <ClassifierIcon schemaClassifier={ado.adoType as any} boxSize={6} />
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
              const path = `${ado.adoType}/${$version}/${formatActionPath(
                action,
              )}`;
              return (
                <NextLink
                  key={keyGen()}
                  href={SITE_LINKS.flexecute(path, appAddress ?? "", ado.name)}
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
