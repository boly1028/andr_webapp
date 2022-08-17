import useQueryAppInfo from "@/lib/graphql/hooks/useQueryAppInfo";
import React, { FC } from "react";
import { AdoAsset } from "../..";

import { Flex, Box, Icon, Button } from "@/theme/ui-elements";
import InlineStat from "./InlineStat";
import { useDisclosure } from "@chakra-ui/hooks";
import { ChevronDownIcon, FallbackPlaceholder } from "@/modules/common";
import AdoItem from "./AdoItem";
import { CloseIcon } from "@chakra-ui/icons";
import { Center, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import ClassifierIcon from "@/theme/icons/classifiers";

interface AppItemProps {
  app: AdoAsset;
}
const AppItem: FC<AppItemProps> = ({ app }) => {
  const {
    data: appInfo,
    loading,
    error,
  } = useQueryAppInfo(app.contractAddress);

  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  const $classifier = "app";
  const $version = "1.0.1";

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
          <InlineStat label="Block Height" value={app.height?.toString()} />
        </Box>
        <Box flex={1}>
          <InlineStat
            label="Address"
            value={
              app.contractAddress.substr(0, 5) +
              "..." +
              app.contractAddress.substr(-5)
            }
          />
        </Box>
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
          <FallbackPlaceholder
            title="ERROR!"
            desc="Something went wrong, we were not able to fetch data properly"
          />
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

export default AppItem;
