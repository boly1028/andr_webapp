import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { memo, useCallback, useEffect, useState } from "react";
import { GlobalModalContext } from "../hooks";
import { ModalProps, ModalType } from "../types";
import TransactionModal from "./TransactionModal";

interface ModalState {
  props: ModalProps;
  type: ModalType;
  onClose?: () => Promise<void>;
}

const components: Record<ModalType, React.FC<ModalProps>> = {
  [ModalType.Transaction]: TransactionModal,
};

const GlobalModalProvider: React.FC = memo(function GlobalModalProvider({
  children,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useState<ModalState | undefined>({
    type: ModalType.Transaction,
    props: { type: "instantiate", msg: {}, codeId: 1712, simulate: false },
  });
  const open = useCallback(
    (type: ModalType, props: ModalProps, _onClose?: () => Promise<void>) => {
      const state = {
        type,
        props,
        onClose: _onClose,
      };

      setModalState(state);
    },
    [],
  );
  const close = useCallback(() => {
    setModalState(undefined);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen && typeof modalState !== "undefined") {
      onOpen();
    } else if (isOpen && typeof modalState === "undefined") {
      onClose();
    }
  }, [modalState, isOpen, onOpen, onClose]);

  const renderComponent = useCallback(() => {
    if (!modalState) return <></>;

    const { type, props } = modalState;
    const Component = components[type];
    if (!Component) return <></>;

    return <Component {...props} />;
  }, [modalState]);

  return (
    <GlobalModalContext.Provider value={{ isOpen, open, close }}>
      <Modal isCentered size="xl" isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent borderRadius="8px">
          <ModalCloseButton />
          <ModalBody>{renderComponent()}</ModalBody>
        </ModalContent>
      </Modal>
      {children}
    </GlobalModalContext.Provider>
  );
});

export default GlobalModalProvider;
