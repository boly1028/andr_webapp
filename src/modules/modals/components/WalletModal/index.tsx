import { Box, Heading } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useGlobalModalContext } from "../../hooks";
import KeplrWallet from "./Keplr";
import { useAndromedaStore } from "@/zustand/andromeda";

const WalletModal: FC = () => {
    const { close } = useGlobalModalContext();
    const connected = useAndromedaStore(state => state.isConnected);

    useEffect(() => {
        if (connected) close();
    }, [connected, close]);

    return (
        <>
            <Heading size="sm" mb="6">
                Select Wallet
            </Heading>
            <Box>
                <KeplrWallet />
            </Box>
        </>
    );
};

export default WalletModal;
