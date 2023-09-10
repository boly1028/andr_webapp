import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useGlobalModalContext } from "../../hooks";
import KeplrWallet from "./Keplr";
import { useAndromedaStore } from "@/zustand/andromeda";
import ChainSelector from "@/modules/common/components/Wallet/ChainSelector";

const WalletModal: FC = () => {
    const { close } = useGlobalModalContext();
    const connected = useAndromedaStore(state => state.isConnected);
    const defaultChainId = useAndromedaStore(state => state.chainId);
    const [chainId, setChainId] = useState(defaultChainId);

    useEffect(() => {
        if (connected) close();
    }, [connected, close]);

    return (
        <VStack alignItems="stretch">
            <HStack>
                <Text textStyle="main-xs-regular" color='content.medium'>
                    Select Chain
                </Text>
                <ChainSelector
                    chain={chainId}
                    onChainChange={(_chainId) => setChainId(_chainId)}
                >
                    {chainId}
                </ChainSelector>
            </HStack>
            <KeplrWallet chainId={chainId} />
        </VStack>
    );
};

export default WalletModal;
