import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  msgs: Array<Record<string, unknown>>;
  isOpen: boolean;
  onClose: () => void;
};

const EstimateFeeModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            direction="column"
            justify="center"
            align="center"
            textAlign="center"
          >
            <Heading size="md" mb="6">
              Connect to a wallet
            </Heading>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EstimateFeeModal;
