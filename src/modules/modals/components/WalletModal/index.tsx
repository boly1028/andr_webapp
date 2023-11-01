import { Box, ButtonGroup, HStack, IconButton, Image, Skeleton, Text, Tooltip, VStack, useToast } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useGlobalModalContext } from "../../hooks";
import KeplrWallet from "./Keplr";
import { KeplrConnectionStatus, connectAndromedaClient, useAndromedaStore } from "@/zustand/andromeda";
import ChainSelector from "@/modules/common/components/Wallet/ChainSelector";
import { useQueryAllChainConfigs } from "@/lib/graphql/hooks/chain/useChainConfig";

const WalletModal: FC = () => {
    const { close } = useGlobalModalContext();
    const connected = useAndromedaStore(state => state.isConnected);
    const { data: chains } = useQueryAllChainConfigs();

    useEffect(() => {
        if (connected) close();
    }, [connected, close]);

    return (
        <VStack spacing={4} mt='10' mb='6'>
            <KeplrWallet >
                <Text textStyle="main-md-medium">Get started by connecting a chain</Text>
                <ButtonGroup variant="theme-outline">
                    {chains ? chains.map(({ chainId, iconUrls, chainName, chainType }) => (
                        <ChainButton
                            key={chainId}
                            logo={iconUrls.sm || iconUrls.lg}
                            chainId={chainId}
                            tooltip={`${chainName} (${chainType})`}
                        />
                    )) : (
                        <Skeleton h="14" rounded="xl" bg='background.800' w='52' />
                    )}
                </ButtonGroup>
                <HStack>
                    <Text textStyle="main-sm-regular" color="content.medium">KEPLR</Text>
                    <Image src="/keplr.png" h="4" />
                </HStack>
            </KeplrWallet>
        </VStack>
    );
};


interface ChainButtonProps {
    chainId: string;
    logo?: string;
    tooltip: string;
}

const ChainButton: FC<ChainButtonProps> = (props) => {
    const { chainId, logo, tooltip } = props;
    const { keplrStatus, isLoading } = useAndromedaStore()
    const [localLoading, setLocalLoading] = useState(false);
    const toast = useToast({
        position: 'top-right',
        'duration': 1000
    })

    const connect = async () => {
        setLocalLoading(true)
        try {
            await connectAndromedaClient(chainId);
        } catch (err: any) {
            console.log(err);
            toast({
                title: "Error while connecting chain",
                description: err?.message,
                status: 'error'
            })
        }
        setLocalLoading(false)
    }
    return (
        <Tooltip label={tooltip || chainId} openDelay={500}>
            <IconButton
                key={chainId}
                aria-label={`connect-${chainId}`}
                icon={<Image src={logo} w='10' h='10' />}
                onClick={connect}
                isLoading={keplrStatus === KeplrConnectionStatus.Connecting || localLoading}
                isDisabled={!localLoading && isLoading}
                w="16"
                h='16'
                rounded="xl"
                transform="auto"
                transition="all"
                _hover={{
                    scale: "105%"
                }}
                variant="theme-outline"
            />
        </Tooltip>
    )
}


export default WalletModal;
