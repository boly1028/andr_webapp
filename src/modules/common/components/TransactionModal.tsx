import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  Box,
  Button,
  Link,
  Text,
  Circle,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  HStack,
  VStack,
  Center,
  Spinner,
} from "@chakra-ui/react";

import { CheckIcon, truncate, PostTx, AlertCircleIcon } from "@/modules/common";

const TITLES: Record<string, string> = {
  idle: "Waiting for confirmation",
  posting: "Waiting for confirmation",
  postError: "There was a problem with that action",
  broadcasting: "Brodcasting",
  broadcastSuccess: "Your transaction has been approved",
  broadcastError: "There was a problem with that action",
};

const SUB_TITLES: Record<string, string> = {
  idle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
  posting:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
  postError:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
  broadcasting:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
  broadcastSuccess:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
  broadcastError:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
};

interface TransactionModalHeaderProps {
  state: PostTx["state"];
}

const TransactionModalHeader: FC<TransactionModalHeaderProps> = ({ state }) => {
  const isSuccess = state.step === "broadcastSuccess";
  const isError = ["postError", "broadcastError"].includes(state.step);
  const showSpinner = !isSuccess && !isError;

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
        {isError && (
          <Circle bg="error.100" p={6} mb={8}>
            <AlertCircleIcon boxSize={10} color="error.600" />
          </Circle>
        )}
      </Center>

      <VStack mb={12}>
        <Text fontWeight={600} color={isError ? "error.700" : "gray.700"}>
          {TITLES[state.step]}
        </Text>
        <Text color={isError ? "error.500" : "gray.500"} textAlign="center">
          {SUB_TITLES[state.step]}
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
  state: PostTx["state"];
}

const TransactionModalSteps: FC<TransactionModalStepsProps> = ({ state }) => {
  const isError = ["postError", "broadcastError"].includes(state.step);

  if (isError) {
    return null;
  }

  return (
    <HStack spacing={2}>
      <TransactionModalStepsItem
        isPending={["posting"].includes(state.step)}
        isActive={[
          "broadcasting",
          "broadcastSuccess",
          "broadcastError",
        ].includes(state.step)}
      />
      <TransactionModalStepsItem
        isPending={["broadcasting"].includes(state.step)}
        isActive={["broadcastSuccess", "broadcastError"].includes(state.step)}
      />
      <TransactionModalStepsItem
        isActive={["broadcastSuccess", "broadcastError"].includes(state.step)}
      />
    </HStack>
  );
};
interface TransactionModalTxIdProps {
  state: PostTx["state"];
}

const TransactionModalTxId: FC<TransactionModalTxIdProps> = ({ state }) => {
  if (state.txHash == null) {
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
      {state.txHash != null && (
        <Link
          color="primary.600"
          href={`https://terrasco.pe/testnet/tx/${state.txHash}`}
          isExternal
          fontSize="sm"
        >
          {truncate(state.txHash)}
        </Link>
      )}
    </Box>
  );
};

interface TransactionModalProps {
  postTx: PostTx;
  onClose: () => void;
}

const TransactionModal: FC<TransactionModalProps> = ({ postTx, onClose }) => {
  const { state } = postTx;

  return (
    <Modal onClose={onClose} isOpen={state.step !== "idle"} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={12}>
          <TransactionModalHeader state={state} />

          <TransactionModalSteps state={state} />

          <TransactionModalTxId state={state} />

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
