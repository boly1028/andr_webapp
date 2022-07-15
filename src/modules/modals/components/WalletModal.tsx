import React, { FC } from "react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Heading,
  chakra,
} from "@chakra-ui/react";
import {
  useConnect,
  useWalletContext,
  KeplrConnectionStatus,
} from "@/lib/wallet";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const WalletModal: FC<Props> = ({ isOpen, onClose }) => {
  const { status: keplrStatus } = useWalletContext();
  const connect = useConnect();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody px={16} py={12}>
          <Heading size="md" mb="6">
            Select Wallet
          </Heading>
          <Box>
            <Button
              variant="outline"
              // leftIcon={<chakra.img src={icon} alt={name} boxSize={6} />} //TODO: Fix Icon
              isFullWidth
              mb={4}
              py={8}
              onClick={connect}
              disabled={keplrStatus !== KeplrConnectionStatus.Ok}
            >
              {keplrStatus === KeplrConnectionStatus.NotInstalled
                ? "Install Keplr to Connect"
                : "Keplr"}
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;
