import { AppComponent } from "@/lib/graphql/hooks/useQueryAppInfo";
import React, { FC } from "react";
import * as classifierIconList from "@/theme/icons/classifiers"; //Load classifier icon list for dynamic assignamnets (redeclared as classifierIcons:any later)

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
import InlineStat from "./InlineStat";
import { MoreHorizontalIcon } from "@/modules/common";
import { useGetSchemaJson } from "@/lib/schema/hooks";

interface AdoItemProps {
  ado: AppComponent;
}
const AdoItem: FC<AdoItemProps> = ({ ado }) => {
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
                <MenuItem key={action}>
                  {/* <MenuItem icon={<Icon as={EyeIcon} boxSize={5} />}> */}
                  {formatActionTitles(action)}
                </MenuItem>
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
  //   Replace '-' and '_' from string
  actionTitleText = actionTitleText.replace("_", " ");
  actionTitleText = actionTitleText.replace("-", " ");

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

export default AdoItem;
