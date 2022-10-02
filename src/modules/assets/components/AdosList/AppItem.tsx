import useQueryAppInfo from "@/lib/graphql/hooks/useQueryAppInfo";
import React, { FC } from "react";
import { AdoAsset } from "../..";
import { v4 as keyGen } from "uuid"; // Used as key assignments for function elements
import NextLink from "next/link";

import {
  Flex,
  Box,
  Icon,
  Button,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@/theme/ui-elements";
import InlineStat from "./InlineStat";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  ChevronDownIcon,
  FallbackPlaceholder,
  truncate,
} from "@/modules/common";
import AdoItem from "./AdoItem";
import { CloseIcon } from "@chakra-ui/icons";
import { Center, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import ClassifierIcon from "@/theme/icons/classifiers";
import useAssetInfoModal from "@/modules/modals/hooks/useAssetInfoModal";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { MoreVertical } from "lucide-react";
import { useGetSchemaADOP } from "@/lib/schema/hooks/useGetSchemaADOP";
import { IAdoType } from "@/lib/schema/types";

interface AppItemProps {
  app: AdoAsset;
}
const AppItem: FC<AppItemProps> = ({ app }) => {
  const { data: appInfo, loading, error } = useQueryAppInfo(app.address);
  const $version = "0.1.0";
  const $classifier = "app";
  // Creating a proxy for app type as it is now reference as app-contract
  const adoType =
    app?.adoType === "app" ? "app-contract" : (app?.adoType as IAdoType);

  const { data: adopData, isLoading } = useGetSchemaADOP(adoType);

  const open = useAssetInfoModal();
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  return (
    <Flex
      border="1px solid"
      borderColor="gray.300"
      p={5}
      borderRadius="lg"
      mb={4}
      _last={{ mb: 0 }}
      direction="column"
    >
      <Flex align="center">
        <Box w={8} h={8} borderRadius="lg" mr={6}>
          {/* Swap background color based on defined class */}
          <Flex justify="center" align="center" borderRadius="lg" p={2}>
            {/* Disable auto loading icon for icon variance based on class and classifier
          {newIcon} */}
            {/* Swap Icon color based on defined class */}
            <ClassifierIcon schemaClassifier={$classifier} boxSize={6} />
          </Flex>
        </Box>

        <Box flex={1}>
          <InlineStat label="Name" value={appInfo?.name ?? app.adoType} />
          {/* <InlineStat label="{type}" value={name} reverse /> */}
        </Box>
        <Box flex={1}>
          <InlineStat label="Type" value={`${app.adoType}@${$version}`} />
        </Box>
        {/* <Box flex={1}>
      <InlineStat label="Version" value={version} />
    </Box> */}
        <Box flex={1}>
          <InlineStat
            label="Block Height"
            value={app.lastUpdatedHeight?.toString()}
          />
        </Box>
        <Box flex={1}>
          <InlineStat label="Address" value={truncate(app.address ?? "")} />
        </Box>
        <Box mr="2">
          <Button
            onClick={() => {
              open(app.address);
            }}
            variant="link"
            colorScheme="blue"
          >
            View
          </Button>
        </Box>
        {/* Section for Action List */}
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            icon={<Icon as={MoreVertical} boxSize={6} />}
            variant="link"
            px="0"
            minW="0"
            mr="0.5"
          />
          <MenuList>
            {adopData?.modifiers?.map((action) => {
              const path = `${adoType}/${$version}/${formatActionPath(action)}`;
              return (
                <NextLink
                  key={keyGen()}
                  href={SITE_LINKS.flexecute(
                    path,
                    app.address ?? "",
                    appInfo?.name ?? "",
                  )}
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
        <Box>
          <Button {...buttonProps} variant="ghost">
            {isOpen ? (
              <CloseIcon boxSize="2" />
            ) : (
              <ChevronDownIcon boxSize="4" />
            )}
          </Button>
        </Box>
      </Flex>
      <Flex
        {...disclosureProps}
        mt="4"
        rounded="xl"
        direction="column"
        bg="gray.50"
      >
        {loading && (
          <Stack>
            <Skeleton h="14" rounded="xl" />
            <Skeleton h="14" rounded="xl" />
          </Stack>
        )}
        {error && (
          <Center pt="4">
            <FallbackPlaceholder
              title="ERROR!"
              desc={
                error.message ||
                "Something went wrong, we were not able to fetch data properly"
              }
            />
          </Center>
        )}
        {appInfo?.components?.length === 0 && (
          <Center pt="4">
            <FallbackPlaceholder
              title="Empty list"
              desc="You don't have any components associated with this app."
            />
          </Center>
        )}
        {appInfo?.components?.map((ado) => (
          <AdoItem
            key={ado.address}
            ado={ado}
            appAddress={appInfo.contractAddress}
          />
        ))}
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

export default AppItem;
