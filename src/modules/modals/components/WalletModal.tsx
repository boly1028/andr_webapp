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

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const WalletModal: FC<Props> = ({ isOpen, onClose }) => {
  const { status, availableConnections, connect } = useWallet();

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
            {status === WalletStatus.WALLET_NOT_CONNECTED && (
              <>
                {availableConnections.map(
                  ({ type, name, icon, identifier = "" }) => (
                    <Button
                      key={"connection-" + type + identifier}
                      variant="outline"
                      leftIcon={
                        <chakra.img src={icon} alt={name} boxSize={6} />
                      }
                      isFullWidth
                      mb={4}
                      py={8}
                      onClick={() => connect(type, identifier)}
                    >
                      {name}
                    </Button>
                  ),
                )}
              </>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;
