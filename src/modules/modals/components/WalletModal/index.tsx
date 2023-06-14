import {
    useWallet,
} from "@/lib/wallet";
import { Box, Heading } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useGlobalModalContext } from "../../hooks";
import KeplrWallet from "./Keplr";

const WalletModal: FC = () => {
    const { close } = useGlobalModalContext();
    const wallet = useWallet();

    useEffect(() => {
        if (wallet) close();
    }, [wallet, close]);

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
