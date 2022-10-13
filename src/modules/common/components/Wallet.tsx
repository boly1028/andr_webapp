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
} from "@chakra-ui/react";
import { FC } from "react";

import { useDisconnect, useWallet, useWalletContext } from "@/lib/wallet";
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
import { useAllChainConfig, useChainConfig } from "@/lib/andrjs";

const WalletConnected = () => {
  const wallet = useWallet();
  const disconnect = useDisconnect();
  const address = truncate(wallet?.address);
  const { chainId, setChainId } = useWalletContext();
  const { data: currentConfig } = useChainConfig(chainId);
  const { data: configs } = useAllChainConfig();

  return (
    <Popover placement="bottom-end">
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Button
              variant="outline"
              size="lg"
              borderColor={isOpen ? "primary.600" : "gray.300"}
            >
              <HStack mr={8}>
                <Image src={currentConfig?.iconUrls?.sm ?? ""} w="6" />
                <Text fontSize="sm">{address}</Text>
                <Badge
                  colorScheme={
                    currentConfig?.chainType === "mainnet" ? "green" : "purple"
                  }
                  fontSize={8}
                  pt="1"
                  rounded="full"
                >
                  {currentConfig?.chainType}
                </Badge>
              </HStack>
              <ChevronDownIcon boxSize={4} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <HStack mb={3} justifyContent="space-between">
                {/* <Icon
                  boxSize={9}
                  p={1}
                  borderRadius="full"
                  border="1px solid"
                  borderColor="gray.300"
                /> */}
                <HStack>
                  <Image src={currentConfig?.iconUrls?.sm ?? ""} w="5" />
                  <Text fontWeight={600} color="gray.700">
                    {currentConfig?.chainName ?? chainId}
                  </Text>
                  <Badge
                    colorScheme={
                      currentConfig?.chainType === "mainnet"
                        ? "green"
                        : "purple"
                    }
                    fontSize={8}
                    pt="1"
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
                          setChainId(config.chainId);
                        }}
                        key={config.chainId}
                      >
                        <Flex
                          direction="row"
                          alignItems="center"
                          gap="2"
                          w="full"
                        >
                          <Image
                            src={config?.iconUrls?.sm ?? ""}
                            w="5"
                            h="5"
                            overflow="hidden"
                            p="1"
                            bg="gray.200"
                            rounded="full"
                          />
                          <Text fontWeight={600} color="gray.700" mr="1">
                            {config?.chainName ?? chainId}
                          </Text>
                          <Badge
                            colorScheme={
                              config?.chainType === "mainnet"
                                ? "green"
                                : "purple"
                            }
                            fontSize={8}
                            pt="1"
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
                value={wallet ? wallet.address : ""}
                mb={2}
                p={2}
                color="gray.700"
                fontSize="sm"
                readOnly
              />
              <HStack mb={2}>
                <CopyButton
                  leftIcon={<CopyIcon boxSize={4} />}
                  variant="outline"
                  isFullWidth
                  fontWeight={500}
                  color="gray.700"
                  text={wallet?.address}
                >
                  Copy address
                </CopyButton>
                <Button
                  as="a"
                  href={
                    currentConfig?.blockExplorerAddressPages[0]?.replaceAll(
                      "${address}",
                      wallet?.address ?? "",
                    ) ?? ""
                  }
                  target="_blank"
                  leftIcon={<ExternalLinkIcon boxSize={4} />}
                  variant="outline"
                  isFullWidth
                  fontWeight={500}
                  color="gray.700"
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
                onClick={disconnect}
                isFullWidth
                fontWeight={500}
                color="gray.700"
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

const Wallet: FC = () => {
  const account = useWallet();
  const onOpen = useWalletModal();

  if (account) {
    return <WalletConnected />;
  }

  return (
    <>
      <Button
        leftIcon={<PlusIcon boxSize={4} />}
        colorScheme="purple"
        onClick={onOpen}
        size="lg"
      >
        Connect Wallet
      </Button>
    </>
  );
};

export default Wallet;
