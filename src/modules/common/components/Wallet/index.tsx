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
import ChainFallbackIcon from "../icons/ChainFallbackIcon";
import { useQueryAllChainConfigs, useQueryChainConfig } from "@/lib/graphql/hooks/chain/useChainConfig";
import { useGetUsername } from "@/lib/andrjs/hooks/useGetUsername";
import { KEPLR_AUTOCONNECT_KEY, LAST_CHAIN_KEY, connectAndromedaClient, disconnectAndromedaClient, useAndromedaStore } from "@/zustand/andromeda";
import { SITE_LINKS } from "../../utils/sitelinks";
import ChainSelector from "./ChainSelector";

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
                            variant="theme-outline"
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
                    <PopoverContent bg='background.900' borderColor="border.main">
                        <PopoverBody bg='backgroundState.idle'>
                            <HStack mb={3} spacing={2} justifyContent="space-between">
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
                                <ChainSelector
                                    chain={chainId}
                                    onChainChange={(_chainId) => connectAndromedaClient(_chainId)}
                                >
                                    Switch
                                </ChainSelector>
                            </HStack>
                            <Input
                                value={address}
                                mb={2}
                                p={2}
                                fontSize="sm"
                                readOnly
                                bg='transparent'
                                variant="outline"
                            />
                            <HStack mb={2}>
                                <CopyButton
                                    leftIcon={<CopyIcon />}
                                    variant="theme-outline"
                                    size='sm'
                                    w='full'
                                    text={address}
                                >
                                    Copy address
                                </CopyButton>
                                <Button
                                    as="a"
                                    href={currentConfig ? SITE_LINKS.blockExplorerAccount(currentConfig, address) : ''}
                                    target="_blank"
                                    leftIcon={<ExternalLinkIcon />}
                                    variant="theme-outline"
                                    size='sm'
                                    w='full'
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
                                leftIcon={<LogOutIcon />}
                                variant="theme-destructive"
                                onClick={disconnectAndromedaClient}
                                w='full'
                                size='sm'
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
            const lastConnectedChain = localStorage.getItem(LAST_CHAIN_KEY);
            connectAndromedaClient(lastConnectedChain);
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
