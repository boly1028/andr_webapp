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

import { CheckIcon, truncate, type TxStep } from "@/modules/common";
import { useTxInfo } from "@arthuryeti/terra";

const TITLES = {
  IDLE: "Waiting for confirmation",
  POSTING: "Waiting for confirmation",
  BROADCASTING: "Brodcasting",
  SUCCESS: "Your transaction has been approved",
  FAILED: "There was a problem with that action",
};

const SUB_TITLES = {
  IDLE: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
  POSTING:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
  BROADCASTING:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
  SUCCESS:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
  FAILED:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
};

interface TransactionModalHeaderProps {
  txStep: TxStep;
}

const TransactionModalHeader: FC<TransactionModalHeaderProps> = ({
  txStep,
}) => {
  const isSuccess = txStep === "SUCCESS";
  const isFailed = txStep === "FAILED";
  const showSpinner = !isSuccess && !isFailed;

  return (
    <>
      <Center>
        {showSpinner && (
          <Spinner
            size="2xl"
            thickness="6px"
            color="primary.600"
            mb={8}
            mt={8}
          />
        )}
        {isSuccess && <CheckIcon boxSize={32} color="primary.600" />}
      </Center>

      <VStack mb={12}>
        <Text fontWeight={600} color="gray.700">
          {TITLES[txStep]}
        </Text>
        <Text color="gray.500" textAlign="center">
          {SUB_TITLES[txStep]}
        </Text>
      </VStack>
    </>
  );
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
  txStep: TxStep;
}

const TransactionModalSteps: FC<TransactionModalStepsProps> = ({ txStep }) => {
  return (
    <HStack spacing={2}>
      <TransactionModalStepsItem
        isPending={txStep == "POSTING"}
        isActive={["BROADCASTING", "SUCCESS", "FAILED"].includes(txStep)}
      />
      <TransactionModalStepsItem
        isPending={["BROADCASTING"].includes(txStep)}
        isActive={["SUCCESS", "FAILED"].includes(txStep)}
      />
      <TransactionModalStepsItem
        isActive={["SUCCESS", "FAILED"].includes(txStep)}
      />
    </HStack>
  );
};
interface TransactionModalTxIdProps {
  txHash: string | null;
}

const TransactionModalTxId: FC<TransactionModalTxIdProps> = ({ txHash }) => {
  if (txHash == null) {
    return <div />;
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
  txHash: string | null;
  txStep: TxStep;
  onTxStepChange: (txStep: TxStep) => void;
  onClose: () => void;
}

const TransactionModal: FC<TransactionModalProps> = ({
  txHash,
  txStep,
  isOpen,
  onTxStepChange,
  onClose,
}) => {
  useTxInfo({
    txHash,
    onSuccess: () => {
      onTxStepChange("SUCCESS");
    },
    onError: () => {
      onTxStepChange("FAILED");
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={12}>
          <TransactionModalHeader txStep={txStep} />

          <TransactionModalSteps txStep={txStep} />

          <TransactionModalTxId txHash={txHash} />

          <Center mt={12}>
            <Button variant="outline" size="lg" px={8} onClick={onClose}>
              Cancel
            </Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
