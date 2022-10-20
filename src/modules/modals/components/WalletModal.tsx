import {
  KeplrConnectionStatus,
  useConnect,
  useWallet,
  useWalletContext,
} from "@/lib/wallet";
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useGlobalModalContext } from "../hooks";

const WalletModal: FC = () => {
  const { status: keplrStatus } = useWalletContext();
  const connect = useConnect();
  const { close } = useGlobalModalContext();
  const wallet = useWallet();

  useEffect(() => {
    if (wallet) close();
  }, [wallet, close]);

  return (
    <>
      <Heading size="md" mb="6">
        Select Wallet
      </Heading>
      <Box>
        <Button
          variant="outline"
          // leftIcon={<chakra.img src={icon} alt={name} boxSize={6} />} //TODO: Fix Icon
          w='full'
          mb={4}
          py={8}
          onClick={connect}
          gap="2"
          disabled={keplrStatus !== KeplrConnectionStatus.Ok}
        >
          {keplrStatus === KeplrConnectionStatus.NotInstalled ? (
            "Install Keplr to Connect"
          ) : (
            <>
            <Image src="/keplr.png" h='8' />
            <Text fontSize='md'>Keplr</Text>
            </>
          )}
        </Button>
      </Box>
    </>
  );
};

export default WalletModal;
