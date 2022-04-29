import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  Box,
  Button,
  Link,
  Text,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  HStack,
  VStack,
  Center,
  Spinner,
} from "@chakra-ui/react";

import { truncate, type TxStep } from "@/modules/common";

const TITLES = {
  POSTING: "Waiting for confirmation",
  BROADCASTING: "Brodcasting",
  SUCCESS: "Your transaction has been approved",
  FAILED: "There was a problem with that action",
};

interface TransactionModalStepsItemProps {
  isActive?: boolean;
  isPending?: boolean;
}

const TransactionModalStepsItem: FC<TransactionModalStepsItemProps> = ({
  isActive,
  isPending,
}) => {
  let color = "gray.200";

  if (isPending) {
    color = "primary.300";
  }

  if (isActive) {
    color = "primary.600";
  }

  return <Box bg={color} h={2} w="full" borderRadius="xl" />;
};

interface TransactionModalStepsProps {
  txStep: TxStep | null;
}

const TransactionModalSteps: FC<TransactionModalStepsProps> = ({ txStep }) => {
  return (
    <HStack spacing={2}>
      <TransactionModalStepsItem isActive />
      <TransactionModalStepsItem isPending />
      <TransactionModalStepsItem />
      <TransactionModalStepsItem />
    </HStack>
  );
};
interface TransactionModalTxIdProps {
  txHash: string | null;
}

const TransactionModalTxId: FC<TransactionModalTxIdProps> = ({ txHash }) => {
  if (txHash == null) {
    return null;
  }

  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      p={4}
      borderRadius="xl"
      mt={12}
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
  );
};

interface TransactionModalProps {
  isOpen: boolean;
  txStep: TxStep | null;
  txHash: string | null;
  onClose: () => void;
}

const TransactionModal: FC<TransactionModalProps> = ({
  txStep,
  txHash,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={true} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={12}>
          <Center mb={8} mt={8}>
            <Spinner size="2xl" thickness="6px" color="primary.600" />
          </Center>

          <VStack mb={12}>
            <Text fontWeight={600} color="gray.700">
              Your transaction has been approved
            </Text>
            <Text color="gray.500" textAlign="center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit
              nullam condimentum massa dictumst.
            </Text>
          </VStack>

          <TransactionModalSteps txStep={txStep} />

          <TransactionModalTxId txHash={txHash} />

          <Center mt={12}>
            <Button variant="outline" size="lg" px={8}>
              Cancel
            </Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
