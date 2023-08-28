import {
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  VStack,
  Badge,
  Box,
  ButtonProps,
  Spinner,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";

import {
  ChevronDownIcon,
  CopyIcon,
  ExternalLinkIcon,
  LogOutIcon,
  PlusIcon,
  ProfileIcon,
  truncate,
  CopyButton,
} from "@/modules/common";
import useWalletModal from "@/modules/modals/hooks/useWalletModal";
import ChainFallbackIcon from "./icons/ChainFallbackIcon";
import { SITE_LINKS } from "../utils/sitelinks";
import { useQueryAllChainConfigs, useQueryChainConfig } from "@/lib/graphql/hooks/chain/useChainConfig";
import { useGetUsername } from "@/lib/andrjs/hooks/useGetUsername";
import { KEPLR_AUTOCONNECT_KEY, connectAndromedaClient, disconnectAndromedaClient, useAndromedaStore } from "@/zustand/andromeda";

interface WalletProps extends ButtonProps {

}

const WalletConnected: FC<WalletProps> = (props) => {
  const { accounts, chainId, isLoading } = useAndromedaStore();
  const account = accounts[0];
  const address = account?.address ?? ''
  const { data: currentConfig } = useQueryChainConfig(chainId);
  const { data: configs } = useQueryAllChainConfigs();
  const iconUrl = currentConfig?.iconUrls?.sm || currentConfig?.iconUrls?.lg;

  const { data: username } = useGetUsername(account?.address);
  return (
    <Popover placement="bottom-end">
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Button
              variant="outline"
              size="sm"
              {...props}
            >
              <HStack mr={2}>
                {iconUrl ? (
                  <Image src={iconUrl ?? ""} w="5" />
                ) : (
                  <Icon
                    as={ChainFallbackIcon}
                    boxSize='5'
                  />
                )}
                <Text fontSize="sm">{truncate(username || address)}</Text>
                <Badge
                  colorScheme={
                    currentConfig?.chainType === "mainnet" ? "green" : "purple"
                  }
                  fontSize='x-small'
                  py='0.5'
                  rounded="full"
                >
                  {currentConfig?.chainType}
                </Badge>
                {isLoading && <Spinner w='4' h='4' />}
              </HStack>
              <ChevronDownIcon boxSize={4} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <HStack mb={3} justifyContent="space-between">
                <HStack>
                  {iconUrl ? (
                    <Image src={iconUrl ?? ""} w="5" />
                  ) : (
                    <Icon
                      as={ChainFallbackIcon}
                      boxSize='5'
                    />
                  )}
                  <Text fontWeight={600} color="base.white">
                    {currentConfig?.chainName ?? chainId}
                  </Text>
                  <Badge
                    colorScheme={
                      currentConfig?.chainType === "mainnet"
                        ? "green"
                        : "purple"
                    }
                    fontSize='x-small'
                    py="0.5"
                    rounded="full"
                  >
                    {currentConfig?.chainType}
                  </Badge>
                </HStack>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Switch
                  </MenuButton>
                  <MenuList>
                    {configs?.map((config) => (
                      <MenuItem
                        onClick={() => {
                          connectAndromedaClient(config.chainId);
                        }}
                        key={config.chainId}
                      >
                        <Flex
                          direction="row"
                          alignItems="center"
                          gap="2"
                          w="full"
                        >
                          {config?.iconUrls?.sm ? (
                            <Image src={config?.iconUrls?.sm ?? ""}
                              w="5"
                              h="5"
                              overflow="hidden"
                              p="0.5"
                              bg="dark.200"
                              rounded="full" />
                          ) : (
                            <Icon
                              as={ChainFallbackIcon}
                              boxSize='5'
                              w="5"
                              h="5"
                              overflow="hidden"
                              p="0.5"
                              bg="dark.200"
                              rounded="full"
                            />
                          )}
                          <Text fontWeight={600} color="base.white" mr="1">
                            {config?.chainName ?? chainId}
                          </Text>
                          <Badge
                            colorScheme={
                              config?.chainType === "mainnet"
                                ? "green"
                                : "purple"
                            }
                            fontSize='x-small'
                            py="1"
                            rounded="full"
                            ml="auto"
                          >
                            {config?.chainType}
                          </Badge>
                        </Flex>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </HStack>
              <Input
                value={address}
                mb={2}
                p={2}
                fontSize="sm"
                readOnly
              />
              <HStack mb={2}>
                <CopyButton
                  leftIcon={<CopyIcon boxSize={4} />}
                  variant="outline"
                  w='full'
                  fontWeight={500}
                  text={address}
                >
                  Copy address
                </CopyButton>
                <Button
                  as="a"
                  href={currentConfig ? SITE_LINKS.blockExplorerAccount(currentConfig, address) : ''}
                  target="_blank"
                  leftIcon={<ExternalLinkIcon boxSize={4} />}
                  variant="outline"
                  w='full'
                  fontWeight={500}
                >
                  Explorer
                </Button>
              </HStack>
              {/* <Box
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
                p={2}
                mb={2}
              >
                <VStack spacing={2} align="flex-start">
                  {TOKENS.map(({ logo, name }) => {
                    return <HoldingItem key={name} logo={logo} name={name} />;
                  })}
                </VStack>
              </Box> */}
              <Button
                leftIcon={<LogOutIcon boxSize={4} />}
                variant="outline"
                onClick={disconnectAndromedaClient}
                w='full'
                fontWeight={500}
              >
                Disconnect
              </Button>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

//Local storage key for autoconnect check

const Wallet: FC<WalletProps> = (props) => {
  const isConnected = useAndromedaStore(state => state.isConnected)
  const isLoading = useAndromedaStore(state => state.isLoading)
  const keplr = useAndromedaStore(state => state.keplr)
  const onOpen = useWalletModal();

  useEffect(() => {
    const autoconnect = localStorage.getItem(KEPLR_AUTOCONNECT_KEY);
    if (!isConnected && typeof keplr !== "undefined" && autoconnect === keplr?.mode) {
      // Should we open terms & condition modals before this?
      connectAndromedaClient();
    }
  }, [keplr, isConnected]);

  if (isConnected) {
    return <WalletConnected {...props} />;
  }

  return (
    <Button
      rightIcon={isLoading ? (<Spinner w='4' h='4' />) : undefined}
      leftIcon={<PlusIcon boxSize={4} />}
      variant="theme-primary"
      onClick={onOpen}
      size="sm"
      {...props}
    >
      Connect Wallet
    </Button>
  );
};

export default Wallet;
