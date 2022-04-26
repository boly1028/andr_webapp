import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  Box,
  Link,
  Text,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  VStack,
} from "@chakra-ui/react";
import { truncate } from "@/modules/common";

type Props = {
  isOpen: boolean;
  txHash: string | null;
  onClose: () => void;
};

const TransactionModal: FC<Props> = ({ txHash, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={12}>
          <VStack mb={6}>
            <Text fontWeight={600} color="gray.700">
              Your transaction has been broadcasted
            </Text>
            <Text color="gray.500" textAlign="center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit
              nullam condimentum massa dictumst.
            </Text>
          </VStack>
          <Box
            border="1px solid"
            borderColor="gray.300"
            p={4}
            borderRadius="xl"
          >
            <Text fontWeight={500} color="gray.700">
              Transaction ID
            </Text>
            {txHash != null && (
              <Link
                color="primary.600"
                href={`https://terrasco.pe/testnet/tx/${txHash}`}
                isExternal
                fontSize="sm"
              >
                {truncate(txHash)}
              </Link>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
