import React, { FC } from "react";
import { v4 as keyGen } from "uuid"; // Used as key assignments for function elements
import NextLink from "next/link";
import styles from './ado.module.css'

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
  Divider,
} from "@/theme/ui-elements";
import InlineStat from "./InlineStat";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  ChevronDownIcon,
  CopyButton,
  FallbackPlaceholder,
  truncate,
} from "@/modules/common";
import { CloseIcon } from "@chakra-ui/icons";
import { Center, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import ClassifierIcon from "@/theme/icons/classifiers";
import useAssetInfoModal from "@/modules/modals/hooks/useAssetInfoModal";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { MoreVertical } from "lucide-react";
import { useGetSchemaADOP } from "@/lib/schema/hooks/useGetSchemaADOP";
import { IAdoType } from "@/lib/schema/types";
import { useGetSchemaVersions } from "@/lib/schema/hooks/useGetSchemaVersion";
import { useQueryBaseAdo } from "@/lib/graphql/hooks/useQueryBaseAdo";
import { useAppConfig } from "@/lib/graphql/hooks/app/useAppConfig";
import { useAppComponents } from "@/lib/graphql/hooks/app/useAppComponents";

interface AdoItemProps {
  address: string;
  name: string;
  proxyAddress?: string;
  adoType: IAdoType;
}

const AdoItem: FC<AdoItemProps> = ({ address, name, proxyAddress, adoType: _adoType }) => {
  const { data: baseAdo } = useQueryBaseAdo(address)

  // Creating a proxy for app type as it is now reference as app-contract
  const adoType = baseAdo?.andr?.type === "app" ? "app-contract" : (baseAdo?.andr?.type ?? _adoType ?? 'undefined') as IAdoType;
  // const { data: app, loading, error } = useAppConfig(address, adoType !== 'app-contract');


  const { data: _version } = useGetSchemaVersions(adoType);
  const version = baseAdo?.andr.version || _version?.latest;
  const { data: adopData, isLoading } = useGetSchemaADOP(adoType, version);

  const open = useAssetInfoModal();
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();

  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  return (
    <Flex
      border="1px solid"
      borderColor="dark.300"
      p={5}
      borderRadius="lg"
      mb={4}
      _last={{ mb: 0 }}
      direction="column"
      w='full'
    >
      <Flex
        align="start"
        gap="2"
        className={styles.container}
      >
        <Box w={8} h={8} borderRadius="lg" mr={6} alignSelf="center">
          <ClassifierIcon adoType={adoType} boxSize={5} />
        </Box>

        <Box flex={1.5}>
          <InlineStat label="Name" value={name || adoType} />
          {/* <InlineStat label="{type}" value={name} reverse /> */}
        </Box>
        <Box flex={1}>
          <InlineStat label="Type" value={`${adoType}@${version}`} />
        </Box>
        <Box flex={1}>
          <InlineStat
            label="Block Height"
            value={baseAdo?.andr.blockHeightUponCreation.toString() ?? ''}
          />
        </Box>
        <Box flex={1}>
          <CopyButton
            as={Box}
            variant="unstyled"
            cursor="pointer"
            text={address}
          >
            <InlineStat label="Address" value={truncate(address ?? "")} />
          </CopyButton>
        </Box>
        <Flex alignItems="center" gap="1" alignSelf="center" w='28' justifyContent='end'>
          {/* Section for Action List */}
          <Box className={styles.onHover}>
            <Button
              onClick={() => {
                open(address, adoType);
              }}
              variant="link"
              colorScheme="blue"
            >
              View
            </Button>
          </Box>
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              icon={<Icon as={MoreVertical} boxSize={5} />}
              variant="link"
              px="0"
              minW="0"
              className={styles.onHover}
            />
            <MenuList>
              <NextLink
                href={SITE_LINKS.adoMultiExecute(`${adoType}/${version}`, address ?? "", name, proxyAddress)}
                passHref
              >
                <MenuItem>
                  Multi Execute
                </MenuItem>
              </NextLink>
              <Divider />
              {adopData?.modifiers?.map((action) => {
                const path = `${adoType}/${version}/${formatActionPath(
                  action,
                )}`;
                return (
                  <NextLink
                    key={action}
                    href={SITE_LINKS.adoExecute(path, address ?? "", name, proxyAddress)}
                    passHref
                  >
                    <MenuItem key={action}>
                      {/* <MenuItem icon={<Icon as={EyeIcon} boxSize={5} />}> */}
                      {formatActionTitles(action)}
                    </MenuItem>
                  </NextLink>
                );
              })}
              <Divider />
              {adopData?.queries?.map((action) => {
                const path = `${adoType}/${version}/${formatActionPath(
                  action,
                )}`;
                return (
                  <NextLink
                    key={action}
                    href={SITE_LINKS.adoQuery(path, address ?? "")}
                    passHref
                  >
                    <MenuItem key={action}>
                      {/* <MenuItem icon={<Icon as={EyeIcon} boxSize={5} />}> */}
                      {formatActionTitles(action.replaceAll('.', ' '))}
                    </MenuItem>
                  </NextLink>
                );
              })}
            </MenuList>
          </Menu>
          {adoType === 'app-contract' && (
            <Box>
              <Button {...buttonProps} variant="unstyled" size="sm">
                {isOpen ? (
                  <CloseIcon boxSize="2" />
                ) : (
                  <ChevronDownIcon boxSize="4" />
                )}
              </Button>
            </Box>
          )}
        </Flex>
      </Flex>
      {isOpen && (
        <Flex
          {...disclosureProps}
          mt="4"
          rounded="xl"
          direction="column"
        // bg="dark.50"
        >
          <ExpandedList appAddress={address} />
        </Flex>
      )}
    </Flex>
  );
};

interface ExpandedListProps {
  appAddress: string;
}
const ExpandedList: FC<ExpandedListProps> = (props) => {
  const { appAddress } = props;
  const { data: components, loading, error } = useAppComponents(appAddress)
  return (
    <Box>
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
      {components?.components.length === 0 && (
        <Center pt="4">
          <FallbackPlaceholder
            title="Empty list"
            desc="You don't have any components associated with this app."
          />
        </Center>
      )}
      {components?.components.map((ado) => (
        <AdoItem
          key={ado.address}
          address={ado.address}
          proxyAddress={appAddress}
          name={ado.name}
          adoType={ado.ado_type.split('@')[0] as IAdoType}
        />
      ))}
    </Box>
  )
}


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
